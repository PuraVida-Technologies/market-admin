// @ts-nocheck

import MockAdapter from "axios-mock-adapter";
import { HttpClient } from "@/types";
import { puraVidaEndpoints } from "@/common/constants";
import { clientSummaryResponseExample } from "@mocks/data/responses/pureVida/client-summary-responses";
import { iocContainer } from "@/inversify.config";
import type { PuraVidaApiClient } from "@/api/home/PuraVidaEndpoints";

describe("PuraVidaApiClient", () => {
  let upstreamMock;
  let puraVidaClient: PuraVidaApiClient;

  beforeEach(() => {
    const httpClient: HttpClient = iocContainer.get<HttpClient>("httpClient");
    upstreamMock = new MockAdapter(httpClient);

    puraVidaClient = iocContainer.get<PuraVidaApiClient>("puraVidaApiClient");
  });

  afterEach(() => {
    upstreamMock.reset();
  });

  describe(".getClients()", () => {
    it("should parse upstream results as expected", async () => {
      // Mock Upstream Response
      upstreamMock
        .onGet(puraVidaEndpoints.CLIENT_SUMMARY)
        .replyOnce(200, clientSummaryResponseExample);

      // Execute the test
      const { clients, totalElements } = await puraVidaClient.getClients();

      clients.forEach((item) => {
        expect(typeof item.id).toEqual("number");
        expect(typeof item.primeId).toEqual("string");
        expect(typeof item.name).toEqual("string");
        expect(typeof item.state).toEqual("string");
        expect(typeof item.asset).toEqual("string");
        expect(typeof item.balances).toEqual("object");
        expect(typeof item.totalFiatAllAssets).toEqual("number");
        expect(typeof item.createdAt).toEqual("string");
        expect(typeof item.createdBy).toEqual("string");
      });
      expect(totalElements).toEqual(29);
    });

    it("should return an empty array when the upstream response is blank", async () => {
      // Mock Upstream Response
      upstreamMock.onGet(puraVidaEndpoints.CLIENT_SUMMARY).replyOnce(200, "");

      // Execute the test
      const { clients, totalElements } = await puraVidaClient.getClients();

      expect(Array.isArray(clients)).toBe(true);
      expect(clients.length).toEqual(0);
      expect(totalElements).toEqual(0);
    });

    it("should return an empty array when the upstream request fails", async () => {
      // Mock Upstream Response
      upstreamMock.onGet(puraVidaEndpoints.CLIENT_SUMMARY).networkErrorOnce();

      // Execute the test
      const { clients, totalElements } = await puraVidaClient.getClients();

      expect(Array.isArray(clients)).toBe(true);
      expect(clients.length).toEqual(0);
      expect(totalElements).toEqual(0);
    });
  });
});
