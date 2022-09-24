// @ts-nocheck

import { PUBLIC_CONFIG_SESSION_KEY } from "@/common/constants";
import {
  cachePublicConfig,
  getPublicConfigCache,
  getPrivateConfig,
} from "@/config/config";
import {
  PUBLIC_CONFIG_TEST_VALUES,
  PUBLIC_CONFIG_MOCK,
  PRIVATE_CONFIG_TEST_VALUES,
  PRIVATE_CONFIG_MOCK,
} from "@mock-data/config/config-mocks";

describe("config", () => {
  afterEach(() => {
    global.sessionStorage.clear();
    global.localStorage.clear();
  });

  describe("getPublicConfigCache()", () => {
    it("should return NULL when no cache exists", async () => {
      const result = getPublicConfigCache();
      expect(result).toEqual(null);
    });

    it("should return the cache object when it exists", async () => {
      const publicCache = JSON.stringify(PUBLIC_CONFIG_MOCK);
      sessionStorage.setItem(PUBLIC_CONFIG_SESSION_KEY, publicCache);

      const result = getPublicConfigCache();
      expect(result.oidc.issuer).toEqual(PUBLIC_CONFIG_TEST_VALUES.issuer);
      expect(result.oidc.redirectUri).toEqual(
        PUBLIC_CONFIG_TEST_VALUES.redirectUri
      );
      expect(result.oidc.clientId).toEqual(PUBLIC_CONFIG_TEST_VALUES.clientId);
      expect(result.oidc.pkce).toEqual(PUBLIC_CONFIG_TEST_VALUES.pkceAsBool);
    });

    it("should return null when the cache is not valid JSON", async () => {
      sessionStorage.setItem(
        PUBLIC_CONFIG_SESSION_KEY,
        "{ [ malformed_json ] }"
      );
      const result = getPublicConfigCache();
      expect(result).toEqual(null);
    });
  });

  describe("cachePublicConfig()", () => {
    it("should store the public config as expected", async () => {
      // Sanity Check
      expect(getPublicConfigCache()).toEqual(null);

      // Store It
      cachePublicConfig(PUBLIC_CONFIG_MOCK);

      // Now check it..
      const result = getPublicConfigCache();
      expect(result.oidc.issuer).toEqual(PUBLIC_CONFIG_TEST_VALUES.issuer);
      expect(result.oidc.redirectUri).toEqual(
        PUBLIC_CONFIG_TEST_VALUES.redirectUri
      );
      expect(result.oidc.clientId).toEqual(PUBLIC_CONFIG_TEST_VALUES.clientId);
      expect(result.oidc.pkce).toEqual(PUBLIC_CONFIG_TEST_VALUES.pkceAsBool);
    });
  });

  describe("getPrivateConfig()", () => {
    it("should return the private configuration as expected", async () => {
      process.env.CONSOLE_LOG_LEVEL =
        PRIVATE_CONFIG_TEST_VALUES.consoleLogLevel;
      process.env.PRETTY_LOGS = PRIVATE_CONFIG_TEST_VALUES.prettyLogs;
      process.env.PURA_VIDA_BASE_URL =
        PRIVATE_CONFIG_TEST_VALUES.puraVidaBaseUrl;

      const result = getPrivateConfig();
      expect(result.CONSOLE_LOG_LEVEL).toEqual(
        PRIVATE_CONFIG_MOCK.CONSOLE_LOG_LEVEL
      );
      expect(result.PRETTY_LOGS).toEqual(PRIVATE_CONFIG_MOCK.PRETTY_LOGS);
      expect(result.providers.puraVida.baseUrl).toEqual(
        PRIVATE_CONFIG_MOCK.providers.puraVida.baseUrl
      );
    });
  });
});
