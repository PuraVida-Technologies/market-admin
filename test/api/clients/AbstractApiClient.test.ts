// @ts-nocheck
// noinspection ES6MissingAwait

import { iocContainer } from "@/inversify.config";
import { PrivateApplicationConfig } from "@/types/PrivateApplicationConfig";
import { AbstractApiClient } from "@/api/home/AbstractApiClient";
import type { MockApiClient } from "@mocks/api/home/MockApiClient";
import UpstreamRequestFailedError from "@/errors/UpstreamRequestFailedError";

describe("AbstractApiClient", () => {
  describe(".get()", () => {
    it("should throw an UpstreamRequestFailedError when the provider connection fails", async () => {
      expect.assertions(1);
      const mockApiClient: MockApiClient = createMockClient("http://somehost");

      // Force an error in the httpClient
      mockApiClient.httpClient.get = () => {
        throw new Error("Any Error");
      };

      expect(mockApiClient.get("", {})).rejects.toThrow(
        UpstreamRequestFailedError
      );
    });
  });

  describe("~getResponseSize()", () => {
    it("should return the correct size for data objects", async () => {
      const result = AbstractApiClient.getResponseSize({ a: 1, b: 2 });
      expect(result).toEqual(13);
    });

    it("should return zero if the data is not an object", async () => {
      const result = AbstractApiClient.getResponseSize(12345);
      expect(result).toEqual(0);
    });

    it("should return zero if the data object is not serializable", async () => {
      const test = { a: 1 };
      test.b = test;
      const result = AbstractApiClient.getResponseSize(test);
      expect(result).toEqual(0);
    });
  });

  describe(".getFullUrl()", () => {
    it("should concatenate the base URL and the provided relative URL as expected", async () => {
      let mockApiClient: MockApiClient = createMockClient("http://somehost");
      expect(mockApiClient.getFullUrl("api/endpoint")).toEqual(
        "http://somehost/api/endpoint"
      );
      expect(mockApiClient.getFullUrl("/api/endpoint")).toEqual(
        "http://somehost/api/endpoint"
      );

      mockApiClient = createMockClient("http://anotherhost/");
      expect(mockApiClient.getFullUrl("api/endpoint")).toEqual(
        "http://anotherhost/api/endpoint"
      );
      expect(mockApiClient.getFullUrl("/api/endpoint")).toEqual(
        "http://anotherhost/api/endpoint"
      );
    });
  });
});

function createMockClient(baseUrl = ""): MockApiClient {
  const config: PrivateApplicationConfig =
    iocContainer.get<PrivateApplicationConfig>("applicationConfig");
  config.providers["mock"].baseUrl = baseUrl;
  return iocContainer.get<MockApiClient>("mockApiClient");
}
