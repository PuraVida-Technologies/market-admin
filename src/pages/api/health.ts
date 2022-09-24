import type { ClientRequest, ClientResponse } from "@/types";
import { apiHealthStatus } from "@/common/constants";

/**
 * Resource Handler for `/health`.
 *
 * @param _clientRequest
 * @param clientResponse
 */
export default async function resourceHandler(
  _clientRequest: ClientRequest,
  clientResponse: ClientResponse
): Promise<void> {
  clientResponse.status(200).json({
    status: apiHealthStatus.OK,
  });
}
