import UpstreamRequestFailedError from "@/errors/UpstreamRequestFailedError";
import { AxiosRequestConfig } from "axios";
import { inject, injectable } from "inversify";
import type { ApiResponse } from "@/types/ApiResponse";
import type { PrivateApplicationConfig } from "@/types/PrivateApplicationConfig";
import type { HttpClient } from "@/types/HttpClient";
import type { Logger } from "winston";
import type { UpstreamProviderConfig } from "@/types/UpstreamProviderConfig";

@injectable()
export class AbstractApiClient {
  protected readonly providerConfigKey: string = "none";
  protected httpClient: HttpClient;
  protected logger: Logger;
  private applicationConfig: PrivateApplicationConfig;
  private parsedBaseUrl: string | null = null;

  static getResponseSize(data: unknown): number {
    if (typeof data !== "object" || !data) {
      return 0;
    }

    let rawData;
    try {
      rawData = JSON.stringify(data);
    } catch (_e) {
      rawData = "";
    }
    return rawData.length;
  }

  constructor(
    @inject<PrivateApplicationConfig>("applicationConfig")
    applicationConfig: PrivateApplicationConfig,
    @inject<HttpClient>("httpClient") httpClient: HttpClient,
    @inject<Logger>("logger") rootLogger: Logger
  ) {
    this.applicationConfig = applicationConfig;
    this.httpClient = httpClient;
    this.logger = rootLogger.child({
      component: this.constructor.name,
    });
  }

  protected get config(): UpstreamProviderConfig {
    return this.applicationConfig.providers[this.providerConfigKey];
  }

  /**
   * Returns the baseUrl for the target API.
   *
   * @protected
   */
  protected get baseUrl(): string {
    if (this.parsedBaseUrl === null) {
      let baseUrl = this.config.baseUrl;
      if (baseUrl.substring(baseUrl.length - 1) === "/") {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
      }
      this.parsedBaseUrl = baseUrl;
    }
    return this.parsedBaseUrl;
  }

  /**
   * When provided a relative URL path, this method will return the
   * full URL to the target resource.
   *
   * @param relativePath
   */
  public getFullUrl(relativePath: string): string {
    if (relativePath.substring(0, 1) === "/") {
      relativePath = relativePath.substring(1);
    }
    return `${this.baseUrl}/${relativePath}`;
  }

  private get defaultAxiosConfig(): AxiosRequestConfig {
    return {
      validateStatus: () => true,
    };
  }

  /**
   * Sends a POST request to the upstream API.
   *
   * @param relativeUrl - The URL to POST to, relative to the API's baseUrl.
   * @param data - The POST payload to send.
   * @protected
   */
  protected async post(
    relativeUrl: string,
    data: unknown
  ): Promise<ApiResponse> {
    const fullUrl = this.getFullUrl(relativeUrl);
    const logPrefix = `${this.constructor.name}:`;
    const standardMeta = {
      request: {
        method: "POST",
        url: fullUrl,
      },
    };

    this.logger.info(
      `${logPrefix} Sending Request: POST ${fullUrl}`,
      standardMeta
    );

    return this.httpClient
      .post(fullUrl, data, this.defaultAxiosConfig)
      .then((response: ApiResponse) => {
        const responseSize = AbstractApiClient.getResponseSize(response.data);

        this.logger.info(
          `${logPrefix} Received [${response.status}] Response from: POST ${fullUrl} (${responseSize} bytes)`,
          {
            ...standardMeta,
            response: {
              contentLength: responseSize,
              statusCode: response.status,
            },
          }
        );
        return response;
      });
  }

  /**
   * Sends a GET request to the upstream API.
   *
   * @param relativeUrl - The URL to POST to, relative to the API's baseUrl.
   * @param params - The GET Params to send.
   * @protected
   */
  protected async get(
    relativeUrl: string,
    params: unknown
  ): Promise<ApiResponse> {
    const fullUrl = this.getFullUrl(relativeUrl);
    const logPrefix = `${this.constructor.name}:`;
    const standardMeta = {
      request: {
        method: "GET",
        url: fullUrl,
      },
    };
    let response: ApiResponse;

    this.logger.info(
      `${logPrefix} Sending Request: GET ${fullUrl}`,
      standardMeta
    );

    try {
      response = await this.httpClient.get(fullUrl, {
        ...this.defaultAxiosConfig,
        params,
      });
    } catch (err) {
      const error = err as Error;
      this.logger.error(
        `${logPrefix} Request Failed: GET ${fullUrl} (${error.message})`
      );
      throw new UpstreamRequestFailedError(
        `${logPrefix} Request Failed: GET ${fullUrl} (${error.message})`
      );
    }

    const responseSize = AbstractApiClient.getResponseSize(response.data);

    this.logger.info(
      `${logPrefix} Received [${response.status}] Response from: GET ${fullUrl} (${responseSize} bytes)`,
      {
        ...standardMeta,
        response: {
          contentLength: responseSize,
          statusCode: response.status,
        },
      }
    );

    return response;
  }
}
