import type { UpstreamProviderConfig } from "@/types/UpstreamProviderConfig";

export type PrivateApplicationConfig = {
  CONSOLE_LOG_LEVEL: string;
  PRETTY_LOGS: boolean;
  providers: { [key: string]: UpstreamProviderConfig };
};
