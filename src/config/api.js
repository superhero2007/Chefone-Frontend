// @flow

const shareEnvVars = {
  SENTRY_DSN: 'https://b3d32b01225942e78e046b0db3986ae4@sentry.io/107056',
};

const development = () => ({
  ...shareEnvVars,
  PARSE_URL: 'https://dev-c1-parse-cloud.chef.one/parse',
  PARSE_APPLICATION_ID: 'dCu1H3zQvQdebNowXwiLYFSJpYrGJHBUk7LIoAS8',
  PARSE_JAVASCRIPT_KEY: 'dl2qjVouh9THDMxJnKWgNSRSnkJbwD0VOPbWccWJ',
  PARSE_MASTER_KEY: process.env.PARSE_MASTER_KEY,
  PARSE_REST_KEY: 'IWpTV5pCQE09dwDZq3cAVAS8fxOnq7wxdxXp0Pgh',
  FACEBOOK_APP_ID: '1062237413813557',
  API_SERVER: 'https://dev-c1-payments.chef.one',
  API_EMAIL_SERVER: 'https://dev-c1-email.chef.one',
  SOFORT_PROJECT_ID: 292865,
  URBAN_AIRSHIP: {
    appKey: '-EkwLekdR3CKrAV6MQ1VBg',
    token:
      'MTotRWt3TGVrZFIzQ0tyQVY2TVExVkJnOlRGTzhxbHphOTE2U2RyQkFuMlMtYWVnc1VCTF9ieVpwclZDODBNM3BLSXM',
    vapidPublicKey:
      'BGbh1iIm9q8LAaAazpVKZNpv2Ezccs96OdZ5Un9N18JvMwXwJdBppCYAHm80SRXwBII3jbWGm31ixL5k3ytDzKA=',
  },
});

const production = ({ RELEASE }) => ({
  ...shareEnvVars,
  PARSE_URL: 'https://prod-c1-parse-cloud.chef.one/parse',
  PARSE_APPLICATION_ID: 'Blx8qxwUngtgM36BawekRClJsuOUXAQrval8FFvF',
  PARSE_JAVASCRIPT_KEY: 'w9wExNXTpe9fDIUmG2jJrlaR1REqZrzCp6lMO70Q',
  PARSE_REST_KEY: 'IWpTV5pCQE09dwDZq3cAVAS8fxOnq7wxdxXp0Pgh',
  PARSE_MASTER_KEY: process.env.PARSE_MASTER_KEY,
  FACEBOOK_APP_ID: '1003645576339408',
  API_SERVER: 'https://prod-c1-payments.chef.one',
  API_EMAIL_SERVER: 'https://prod-c1-email.chef.one',
  SOFORT_PROJECT_ID: RELEASE ? 293513 : 293512,
  URBAN_AIRSHIP: {
    appKey: 'cL3HkrFETWWoQb2tmshqjw',
    token:
      'MTpjTDNIa3JGRVRXV29RYjJ0bXNocWp3OnU5aURLcHhsSXdKUk51TmxRUC1URi03eU5TdHQ0WHRWcTlBZ2ttR0lqWmc',
    vapidPublicKey:
      'BFv5TQU_te8zOPH6iBaMrm0VsmXb_-ot90O05npQnoPZfENJByTTYpKZJA0J3DJWSrRFcGh3eVKH99Zqdu_gBpc=',
  },
});

const map = {
  production,
  'prod.chef.one': production,
  development,
  'dev.chef.one': development,
};

export default (env: Object) => {
  const { CIRCUIT } = env;
  return map[CIRCUIT](env);
};
