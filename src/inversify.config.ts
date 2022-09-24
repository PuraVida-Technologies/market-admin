import "reflect-metadata";
import axios from "axios";
import pkg from "../package.json";
import { getPrivateConfig } from "@/config/config";
import { initRootLogger } from "@/logging/initRootLogger";
import { Container, interfaces } from "inversify";
import type {
  PrivateApplicationConfig,
  HttpClient,
  IocContainer,
  Logger,
} from "@/types";

const iocContainer: IocContainer = new Container();

// Constants
iocContainer.bind<string>("applicationVersion").toConstantValue(pkg.version);

// Config
iocContainer
  .bind<PrivateApplicationConfig>("applicationConfig")
  .toConstantValue(getPrivateConfig());

// Libs
iocContainer.bind<HttpClient>("httpClient").toConstantValue(axios);

// Services

iocContainer
  .bind<Logger>("logger")
  .toDynamicValue((context: interfaces.Context) => {
    const config: PrivateApplicationConfig =
      context.container.get<PrivateApplicationConfig>("applicationConfig");
    const applicationVersion: string =
      context.container.get<string>("applicationVersion");
    return initRootLogger(
      config.PRETTY_LOGS,
      config.CONSOLE_LOG_LEVEL,
      applicationVersion
    );
  })
  .inSingletonScope();

// API Clients

export { iocContainer };
