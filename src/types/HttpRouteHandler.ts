import type { Container } from "inversify";
import type { Logger } from "winston";
import type { NextApiRequest, NextApiResponse } from "next";

export type HttpRouteHandler = (
  clientRequest: NextApiRequest,
  clientResponse: NextApiResponse,
  iocContainer: Container,
  logger: Logger
) => Promise<unknown>;
