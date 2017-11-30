//@flow

import getBranch from 'git-branch';

const remoteCircuitMap = {
  'chef.one': 'production',
  'prod.chef.one': 'production',
  'dev.chef.one': 'development',
};

const publicUrlMap = {
  live: 'chef.one',
  production: 'prod.chef.one',
  development: 'dev.chef.one',
};

export default () => {
  const {
    TARGET,
    NODE_ENV,
    CIRCUIT,
    HOST,
    PROTOCOL,
    PORT,
    RELEASE,
    DLL,
    __DISABLE_SSR__,
  } = process.env;

  const FINAL_TARGET =
    TARGET === 'server'
      ? 'server'
      : TARGET === 'client' ? 'client' : 'universal';
  let res = {
    DLL: DLL === 'vendor' ? 'vendor' : 'main',
    NODE_ENV: NODE_ENV === 'production' ? 'production' : 'development',
    TARGET: FINAL_TARGET,
    shouldBuildServer:
      FINAL_TARGET === 'server' || FINAL_TARGET === 'universal',
    shouldBuildClient:
      FINAL_TARGET === 'client' || FINAL_TARGET === 'universal',
  };

  let circuitByBranch;

  let branch;
  try {
    branch = getBranch.sync() || process.env.CI_BRANCH;
  } catch (err) {
    console.log(err);
  }
  if (branch === 'develop') {
    circuitByBranch = 'development';
  } else if (branch === 'master') {
    circuitByBranch = 'production';
  }
  console.log('GIT BRANCH IS: ', branch);
  console.log('circuitByBranch: ', circuitByBranch);

  const remoteCircuit = CIRCUIT ? remoteCircuitMap[CIRCUIT] : null;

  res = {
    ...res,
    HOST: HOST || 'localhost',
    CIRCUIT:
      CIRCUIT === 'production'
        ? 'production'
        : CIRCUIT === 'development'
          ? 'development'
          : circuitByBranch || remoteCircuit || 'development',
  };

  let port = res.CIRCUIT === 'production' ? 8080 : 3000;
  if (res.NODE_ENV === 'development') {
    port = port + 1;
  }

  res = {
    ...res,
    PROTOCOL: PROTOCOL || (res.NODE_ENV === 'development' ? 'http' : 'https'),
    PORT: parseInt(PORT) || port,
  };

  if (RELEASE) {
    if (RELEASE !== 'IAMSURE') {
      throw Error('You should be sure!');
    }

    res = { ...res, RELEASE: !!RELEASE };
  }

  res.__DISABLE_SSR__ = __DISABLE_SSR__ == 'false' ? false : true;

  if (res.RELEASE) {
    res = {
      ...res,
      PORT: 9000,
      NODE_ENV: 'production',
      CIRCUIT: 'production',
    };
    console.log('!!!!!!! RELEASE !!!!!!!');
  }

  const DOMAIN = `${publicUrlMap[res.RELEASE ? 'live' : res.CIRCUIT]}`;
  const PUBLIC_URL = `https://${DOMAIN}`;
  const WWW_PUBLIC_URL = `https://www.${DOMAIN}`;

  res = {
    ...res,
    PUBLIC_URL,
    WWW_PUBLIC_URL,
    SITEMAP_KEY: 'replace-me',
    KEYWORDS:
      'Neue Leute kennenlernen Großstadt, Fine Dining, Alternative Sternerestaurant, Social Dinin, Social Dinne, Social Cookin, Koch freelancen, Sternerestauran, Mietkoc, Caterer werde, Das perfekte Dinne, Dinnerparty, Dinnerparty Hamburg,	Neu in Hamburg, Dinnerparty Kiel,	Neuin Kiel, Dinnerparty Lübeck,	Neu in Lübeck, Dinnerparty Rostock,	Neu in Rostock, Dinnerparty Hannover,	Neu in Hannover, Dinnerparty Göttingen,	Neu in Göttingen, Dinnerparty Berlin,	Neu in Berlin, Dinnerparty München,	Neu in München, Dinnerparty Frankfurt,	Neu in Frankfurt, Dinnerparty Stuttgart,	Neu in Stuttgart, Dinnerparty Nürnberg,	Neu in Nürnberg, Dinnerparty Köln,	Neu in Köln, Dinnerparty Dresden,	Neu in Dresden, Dinnerparty Leipzig, Neu in Leipzig, Dinnerparty Dortmund,	Neu in Dortmund, Dinnerparty Essen,	Neu in Essen, Dinnerparty Bremen,	Neu in Bremen, Dinnerparty Duisburg,	Neu in Duisburg, Dinnerparty Bonn,	Neu in Bonn, Dinnerparty Münster,	Neu in Münster, Dinnerparty Heidelberg,	Neu in Heidelberg, Dinnerparty Düsseldorf,	Neu in Düsseldorf, Dinnerparty Gelsenkirchen, Neu in Gelsenkirchen, Dinnerparty Bochum, Neu in Bochum, Dinnerparty Wuppertal, Neu in Wuppertal, Dinnerparty Bielefeld,	Neu in Bielefeld, Dinnerparty Augsburg,	Neu in Mag, Dinnerparty Erfurt,	Neu in Erfurt, Dinnerparty Magdeburg,	Neu in Magdeburg,Essen gehen, Neu in der Stadt, Supper Club, Zuhause für andere Leute kochen, Leute in neuer Stadt kennenlernen, kulinarische Abenteuer',
  };

  console.log('PUBLIC_URL: ', PUBLIC_URL);
  console.log('DLL IS: ', res.DLL);
  console.log('__DISABLE_SSR__ IS: ', res.__DISABLE_SSR__);
  console.log('PORT IS: ', res.PORT);
  console.log('NODE_ENV IS: ', res.NODE_ENV);
  console.log('CIRCUIT IS: ', res.CIRCUIT);
  console.log('PROTOCOL IS: ', res.PROTOCOL);
  console.log('HOST IS: ', res.HOST);
  return res;
};
