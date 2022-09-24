export type PublicApplicationConfig = {
  oidc: {
    redirectUri: string;
    clientId: string;
    pkce: boolean;
  };
};
