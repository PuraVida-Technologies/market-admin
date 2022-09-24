// @ts-nocheck

import resourceHandler from "@/pages/api/health";
import { apiHealthStatus } from "@/common/constants";
import { createMocks } from "node-mocks-http";

describe("/health", () => {
  it("should return a 200 response for valid requests", async () => {
    const { req, res } = createMocks({
      method: "GET",
      url: "/irrelevant",
    });

    await resourceHandler(req, res);
    const data = res._getJSONData();
    const statusCode = res._getStatusCode();

    expect(statusCode).toEqual(200);
    expect(data.status).toEqual(apiHealthStatus.OK);
  });
});
