import type { ClientRequest, Logger } from "@/types";

export function createRequestLogger(
  clientRequest: ClientRequest,
  parentLogger: Logger
): Logger {
  const requestLogger: Logger = parentLogger.child({
    request: {
      method: clientRequest.method,
      url: clientRequest.url,
    },
    component: "RequestHandler",
  });
  requestLogger.info(
    `Client Request Received: ${clientRequest.method} ${clientRequest.url}`
  );
  return requestLogger;
}
