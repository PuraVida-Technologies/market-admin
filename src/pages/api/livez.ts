import type { NextApiRequest, NextApiResponse } from "next";
import { version } from "../../../package.json";

type Data = {
  version: string;
};
/**
 * Resource Handler for `/health`.
 *
 * @param _clientRequest
 * @param clientResponse
 */
export default async function resourceHandler(
  _clientRequest: NextApiRequest,
  clientResponse: NextApiResponse<Data>
): Promise<void> {
  clientResponse.status(200).json({ version });
}
