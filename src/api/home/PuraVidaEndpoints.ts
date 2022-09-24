import { AbstractApiClient } from "@/api/home/AbstractApiClient";
import { injectable } from "inversify";

@injectable()
export class PuraVidaApiClient extends AbstractApiClient {
  protected readonly providerConfigKey: string = "PuraVida";
}
