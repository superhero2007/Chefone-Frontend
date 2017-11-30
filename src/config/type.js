// @flow

export type TCONFIG = {
  env: {
    KEYWORDS: string,
    PORT: number,
    __DISABLE_SSR__: boolean,
    RELEASE?: boolean,
    PROTOCOL: string,
    HOST: string,
    NODE_ENV: 'development' | 'production',
    TARGET: 'server' | 'client' | 'universal',
    WEBPACK_TARGET?: 'node' | 'web',
    CIRCUIT: 'development' | 'production',
    DLL?: 'vendor' | 'main',
    PUBLIC_URL: string,
    WWW_PUBLIC_URL: string,
    SITEMAP_KEY: string,
    shouldBuildServer?: boolean,
    shouldBuildClient?: boolean,
  },
  api: {
    API_SERVER: string,
    API_EMAIL_SERVER: string,
    SENTRY_DSN: string,
    FACEBOOK_APP_ID: string,
    SOFORT_PROJECT_ID: string,
    PARSE_URL: string,
    PARSE_APPLICATION_ID: string,
    PARSE_JAVASCRIPT_KEY: string,
    PARSE_REST_KEY: string,
    URBAN_AIRSHIP: {
      appKey: string,
      token: string,
      vapidPublicKey: string,
    },
  },
};
