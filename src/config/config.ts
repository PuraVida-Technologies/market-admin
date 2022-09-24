import { PUBLIC_CONFIG_SESSION_KEY } from "@/common/constants";
import { PublicApplicationConfig } from "@/types/PublicApplicationConfig";
import { parseEnvString, parseEnvEnabler } from "@/util/configHelpers";
import type { PrivateApplicationConfig } from "@/types/PrivateApplicationConfig";

export function getPublicConfigCache(): PublicApplicationConfig | null {
  if (typeof window === "undefined") {
    /* istanbul ignore next */
    return null;
  }
  const sessionData = sessionStorage.getItem(PUBLIC_CONFIG_SESSION_KEY);
  if (!sessionData) {
    return null;
  }
  try {
    return JSON.parse(sessionData);
  } catch (_err) {
    return null;
  }
}

export function cachePublicConfig(config: PublicApplicationConfig): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(PUBLIC_CONFIG_SESSION_KEY, JSON.stringify(config));
  }
}

export function getPrivateConfig(): PrivateApplicationConfig {
  return {
    CONSOLE_LOG_LEVEL: parseEnvString(
      "CONSOLE_LOG_LEVEL",
      process.env.CONSOLE_LOG_LEVEL
    ),
    PRETTY_LOGS: parseEnvEnabler("PRETTY_LOGS", process.env.PRETTY_LOGS),
    providers: {
      puraVida: {
        baseUrl: parseEnvString(
          "PURA_VIDA_BASE_URL",
          process.env.PURA_VIDA_BASE_URL
        ),
      },
    },
  };
}
