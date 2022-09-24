import { AbstractApiClient } from "@/api/home/AbstractApiClient";
import { injectable } from "inversify";

@injectable()
export class MockApiClient extends AbstractApiClient {
  protected readonly providerConfigKey: string = "mock";
}
