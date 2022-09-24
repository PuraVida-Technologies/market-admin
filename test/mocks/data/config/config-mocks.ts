export const PUBLIC_CONFIG_TEST_VALUES = {
  issuer: "http://some.issuer/auth/abc",
  redirectUri: "http://some.redirect/xyz/123",
  clientId: "abc123",
  pkce: "disabled",
  pkceAsBool: false,
};

export const PUBLIC_CONFIG_MOCK = {
  oidc: {
    issuer: PUBLIC_CONFIG_TEST_VALUES.issuer,
    redirectUri: PUBLIC_CONFIG_TEST_VALUES.redirectUri,
    clientId: PUBLIC_CONFIG_TEST_VALUES.clientId,
    pkce: PUBLIC_CONFIG_TEST_VALUES.pkceAsBool,
  },
};

export const PRIVATE_CONFIG_TEST_VALUES = {
  consoleLogLevel: "info",
  prettyLogs: "no",
  prettyLogsAsBool: false,
  puraVidaBaseUrl: "http://puravida/api/123",
};

export const PRIVATE_CONFIG_MOCK = {
  CONSOLE_LOG_LEVEL: PRIVATE_CONFIG_TEST_VALUES.consoleLogLevel,
  PRETTY_LOGS: PRIVATE_CONFIG_TEST_VALUES.prettyLogsAsBool,
  providers: {
    puravida: {
      baseUrl: PRIVATE_CONFIG_TEST_VALUES.puraVidaBaseUrl,
    },
  },
};
