import AbstractCustomError from "@/errors/AbstractCustomError";
import MethodNotAllowedError from "@/errors/MethodNotAllowedError";
import UnexpectedConditionError from "@/errors/UnexpectedConditionError";
import { createRequestLogger } from "@/logging/createRequestLogger";
import { iocContainer } from "@/inversify.config";
import type {
  ClientRequest,
  ClientResponse,
  Logger,
  MethodRouteConfig,
} from "@/types";

/**
 * Routes HTTP requests to handler functions based on the HTTP Method
 * specified in the request. This method also provides basic functionality
 * (such as error handling), initializes router handler dependencies
 * (such as a request logger), and injects the IoC Container into the route
 * handlers.
 *
 * @param routeConfig
 * @param clientRequest
 * @param clientResponse
 */
export async function createMethodRoutes(
  routeConfig: MethodRouteConfig,
  clientRequest: ClientRequest,
  clientResponse: ClientResponse
): Promise<void> {
  const rootLogger: Logger = iocContainer.get<Logger>("logger");
  const requestLogger: Logger = createRequestLogger(clientRequest, rootLogger);

  /* istanbul ignore next */
  if (!clientRequest.method) {
    return generateErrorResponse(
      new UnexpectedConditionError("Method not specified in request"),
      clientRequest,
      clientResponse,
      requestLogger
    );
  }
  if (!routeConfig[clientRequest.method]) {
    return generateErrorResponse(
      new MethodNotAllowedError("Method Not Allowed"),
      clientRequest,
      clientResponse,
      requestLogger
    );
  }
  try {
    const result: unknown = await routeConfig[clientRequest.method](
      clientRequest,
      clientResponse,
      iocContainer,
      requestLogger
    );
    clientResponse.status(200).json(result);
    return;
  } catch (err) {
    /* istanbul ignore next */
    if (typeof err !== "object" || !(err instanceof Error)) {
      return generateErrorResponse(
        new UnexpectedConditionError(
          "Unrecognized object caught in method router"
        ),
        clientRequest,
        clientResponse,
        requestLogger
      );
    }

    /* istanbul ignore next */
    if (!(err instanceof AbstractCustomError)) {
      return generateErrorResponse(
        new UnexpectedConditionError(
          `Uncaught Error (${err.constructor.name}) in method router: ${err.message}`
        ),
        clientRequest,
        clientResponse,
        requestLogger
      );
    }
    return generateErrorResponse(
      err,
      clientRequest,
      clientResponse,
      requestLogger
    );
  }
}

/**
 * Generates a response to the client when provided an HTTP-compatible
 * error object.
 *
 * @param err
 * @param clientRequest
 * @param clientResponse
 * @param logger
 */
async function generateErrorResponse(
  err: AbstractCustomError,
  clientRequest: ClientRequest,
  clientResponse: ClientResponse,
  logger: Logger
): Promise<void> {
  logger.error(
    `Sending [${err.httpStatusCode}] Response to Client for: ${clientRequest.method} ${clientRequest.url} (${err.httpStatusString})`,
    {
      error: err,
      response: {
        statusCode: err.httpStatusCode,
        statusString: err.httpStatusString,
      },
    }
  );
  clientResponse.status(err.httpStatusCode).json(
    /*JSON.stringify(*/ {
      error: {
        type: err.constructor.name,
        message: err.message,
      },
      statusCode: err.httpStatusCode,
      statusString: err.httpStatusString,
      success: false,
    } //)
  );
}
