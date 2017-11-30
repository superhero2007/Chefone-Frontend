//@flow

import Express from 'express';
import webpack from 'webpack';
import path from 'path';
import CONFIG from '../src/config';
import createConfig from './createConfig';
import proxy from 'http-proxy-middleware';

const { env: { PORT } } = CONFIG;

const clientConfig = createConfig(CONFIG);
const compiler = webpack(clientConfig);

const host = 'localhost';
const port = PORT + 1000;

const serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: clientConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
};

const app = new Express();

const devMiddleware = require('webpack-dev-middleware')(
  compiler,
  serverOptions,
);

app.use(
  '/api-payment',
  proxy({
    logLevel: 'debug',
    target: `http://${host}:${PORT}`,
    changeOrigin: true,
  }),
);

app.use(
  '/api-mail',
  proxy({
    logLevel: 'debug',
    target: `http://${host}:${PORT}`,
    changeOrigin: true,
  }),
);

app.use(
  '/cloud',
  proxy({
    logLevel: 'debug',
    target: `http://${host}:${PORT}`,
    changeOrigin: true,
  }),
);

app.use(
  '/signUpMailchip',
  proxy({
    logLevel: 'debug',
    target: `http://${host}:${PORT}`,
    changeOrigin: true,
  }),
);

app.use(devMiddleware);
app.use(require('webpack-hot-middleware')(compiler));

app.get('/static/vendor.js', (req, res) => {
  res.sendFile(path.resolve('./build/vendor.bundle.js'));
});

app.get('*', (req, res) => {
  // Here is it! Get the index.html from the fileSystem
  const htmlBuffer = devMiddleware.fileSystem.readFileSync(
    `${clientConfig.output.path}/index.html`,
  );

  res.send(htmlBuffer.toString());
});

app.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    console.info(
      '==> 🚧  Webpack development server listening on port %s',
      port,
    );
  }
});
