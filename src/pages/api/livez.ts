import type { NextApiRequest, NextApiResponse } from "next";

import { apiHealthStatus } from "@/common/constants";

/**
 * Resource Handler for `/health`.
 *
 * @param _clientRequest
 * @param clientResponse
 */
export default async function resourceHandler(
  _clientRequest: NextApiRequest,
  clientResponse: NextApiResponse
): Promise<void> {
  clientResponse.status(200).json({
    status: apiHealthStatus.OK,
  });
}
