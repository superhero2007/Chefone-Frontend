// @flow

if (__SERVER__) {
  global.System = {
    import: function(path) {
      //$FlowIssue
      return Promise.resolve(require(path));
    },
  };
}

import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
// import React from 'react';
// import ReactDOM from 'react-dom/server';
import compression from 'compression';
import path from 'path';
// import Html from '../helpers/Html';
// import { match } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
// import { ReduxAsyncConnect, loadOnServer } from '../redux-async-connect';
// import createHistory from 'history/lib/createMemoryHistory';
import proxy from 'http-proxy-middleware';
// import { Provider } from 'react-redux';
// import PrettyError from 'pretty-error';

// import createStore from '../redux/create';

import { onStart, regenerateSitemap, submitSitemap } from './routines';

import CONFIG from '../universalConfig';
const { env: { SITEMAP_KEY } } = CONFIG;

// const pretty = new PrettyError();

const rootPath = process.cwd();

console.log(rootPath);
export default () => {
  global.CONFIG = CONFIG;
  const {
    // env: { __DISABLE_SSR__ },s
    api: {
      API_EMAIL_SERVER,
      API_SERVER,
      PARSE_URL,
      PARSE_APPLICATION_ID,
      PARSE_REST_KEY,
      URBAN_AIRSHIP,
    },
  } = CONFIG;

  require('../universalBootstrap');

  console.log(CONFIG);

  // const getRoutes = require('../routes');
  const { env: { PORT } } = CONFIG;
  let port = PORT;

  const app = express();
  app.get('/version', async (req, res) => {
    const { version, name } = JSON.parse(
      fs.readFileSync(`${process.cwd()}/package.json`, 'utf-8'),
    );
    const { env: { CIRCUIT } } = CONFIG;
    const finalObj = JSON.stringify({ version, name, CIRCUIT }, null, 2);
    console.log(finalObj);
    res.status(200).send(finalObj);
  });
  // app.use(morgan('combined'))
  app.use(compression());
  app.use(favicon(path.join(rootPath, 'static', 'copy', 'favi-icon.png')));
  app.use('/static', express.static(path.join(rootPath, 'static')));
  app.use('/build', express.static(path.join(rootPath, 'build')));

  app.use(
    '/google52cafd6513c1f530.html',
    express.static(
      path.join(rootPath, 'static', 'google52cafd6513c1f530.html'),
    ),
  );

  app.use(
    '/loaderio-815458c08e75dffaef4dc56383b96806.txt',
    express.static(
      path.join(
        rootPath,
        'static',
        'loaderio-815458c08e75dffaef4dc56383b96806.txt',
      ),
    ),
  );

  app.use(
    '/sitemap.xml',
    express.static(path.join(rootPath, 'static', 'sitemap.xml')),
  );

  const pushWorkerFct = ({
    appKey,
    token,
    vapidPublicKey,
  }: {
    appKey: string,
    token: string,
    vapidPublicKey: string,
  }) => {
    return `// 86acbd31cd7c09cf30acb66d2fbedc91daa48b86:1498489569.49
importScripts('https://web-sdk.urbanairship.com/notify/v1/ua-sdk.min.js');
uaSetup.worker(self, {
  // This  has a default of  /
  //      push -
  //    worker.js. It should live at the root of
  // your domain. It only needs to be specified if your worker lives at a
  // different path.
  // workerUrl: '/push-worker.js',

  defaultIcon:
    'https://blog.chef.one/wp\u002Dcontent/uploads/2017/06/icon_512x512.png',
  defaultTitle: 'CHEF.ONE',
  defaultActionURL: 'https://www.chef.one',
  appKey: '${appKey}',
  token:
    '${token}',
  vapidPublicKey:
    '${vapidPublicKey}'
});
`;
  };

  app.get('/push-worker.js', async (req, res) => {
    res
      .status(200)
      .header('Content-Type', 'application/javascript')
      .send(pushWorkerFct(URBAN_AIRSHIP));
  });

  app.get('/sitemap/:key', async (req, res, next) => {
    console.log('sitemap');
    if (req.params.key !== SITEMAP_KEY) {
      res.status(404).send('Not found');
    } else {
      try {
        await regenerateSitemap();

        res.status(201).send({ success: true });
        next();
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    }
  });

  app.get('/sitemap-submit/:key', async (req, res, next) => {
    console.log('sitemap-submit');
    if (req.params.key !== SITEMAP_KEY) {
      res.status(404).send('Not found');
    } else {
      try {
        await submitSitemap();
        res.status(200).send({ success: true });
        next();
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    }
  });

  app.use(
    '/api-payment',
    proxy({
      pathRewrite: {
        '^/api-payment/': '/',
      },
      logLevel: 'debug',
      target: API_SERVER,
      changeOrigin: true,
    }),
  );

  app.use(
    '/api-mail',
    proxy({
      pathRewrite: {
        '^/api-mail/': '/',
      },
      logLevel: 'debug',
      target: API_EMAIL_SERVER,
      changeOrigin: true,
    }),
  );

  app.use(
    '/cloud',
    proxy({
      pathRewrite: {
        '^/cloud/': '/functions/',
      },
      logLevel: 'debug',
      headers: {
        'X-Parse-Application-Id': PARSE_APPLICATION_ID,
        'X-Parse-REST-API-Key': PARSE_REST_KEY,
      },
      target: PARSE_URL,
      changeOrigin: true,
    }),
  );

  app.use(bodyParser.json());

  app.post('/signUpMailchip', async (req, res) => {
    const { cityName, email } = req.body;
    console.log(req.body);
    const response = await fetch(
      'https://us11.api.mailchimp.com/3.0/lists/3aecbea311/members/',
      {
        method: 'POST',
        headers: {
          Authorization:
            'Basic bGFwYW5vaWQ6MTg0YWZlOTY2ZTg0MTg0NWI2NWEwMGE0MGNmYTIzN2ItdXMxMQ==',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'pending',
          merge_fields: {
            MMERGE3: cityName,
          },
        }),
      },
    );
    const jsonRes = await response.json();

    res.send(jsonRes);
  });

  app.use('/static', express.static(path.join(rootPath, 'static')));

  app.use((req, res) => res.sendFile(path.join(rootPath, 'static/index.html')));

  return app.listen(port, '0.0.0.0', err => {
    if (err) {
      console.log(err.stack);
      return;
    }

    onStart();

    console.log('Listening at 0.0.0.0:' + port);
  });
};
