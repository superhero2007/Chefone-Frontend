//@flow

import rules from './rules';
import fs from 'fs';
import plugins from './plugins';
import path from 'path';
import R from 'ramda';

const deps_ = Object.keys(
  //$FlowIssue
  require(process.cwd() + '/package.json').dependencies,
);
//$FlowIssue
const deps = R.difference(deps_, 'babel-runtime');

let nodeModules = {};

const nodeModules_ = fs
  .readdirSync('./node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1);

//$FlowIssue
R.difference(nodeModules_, 'react-flexbox-grid').forEach(mod => {
  nodeModules[mod] = `commonjs ${mod}`;
});

export default (CONFIG: *) => {
  const {
    env: { DLL, NODE_ENV, PORT, PROTOCOL, HOST, WEBPACK_TARGET },
  } = CONFIG;

  const isNode = WEBPACK_TARGET === 'node';
  console.log('isNode', isNode);

  // const vendorDeps = Object.keys(require('../package.json').dependencies);
  const isProduction = NODE_ENV === 'production';

  const port = isProduction ? PORT : PORT + 1000;

  var clientEntry = [
    'event-source-polyfill',
    'babel-polyfill',
    'whatwg-fetch',
    'react-hot-loader/patch',
  ];
  if (!isProduction) {
    clientEntry = [
      ...clientEntry,
      `webpack-hot-middleware/client?path=http://${HOST}:${port}/__webpack_hmr`,
    ];
  }

  clientEntry = [...clientEntry, './src/client/index.js'];

  const publicPathUrl = !isProduction
    ? `${PROTOCOL}://${HOST}:${port}/static/`
    : '/static/';
  const isDll = DLL === 'vendor' && !isNode;
  const output = isDll
    ? {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '..', './build/'),
        publicPath: ``,
        library: '[name]_lib',
      }
    : {
        filename: isNode
          ? 'index.js'
          : isProduction ? '[name].[chunkhash].js' : '[name].js',
        publicPath: !process.env.S3_BUCKET
          ? `${publicPathUrl}`
          : `https://${process.env.S3_BUCKET.replace(
              'c1-chefone-frontend',
              'cdn.chef.one',
            )}/`,
        path: !isProduction
          ? isNode
            ? path.resolve(__dirname, '..', './build/server')
            : path.resolve(__dirname, '..', '.tmp', 'dll')
          : path.resolve(
              __dirname,
              '..',
              isNode ? './dist/build/src/server' : './dist/build/static',
            ),
      };

  const nodeEntry = [
    ...(isProduction ? [] : ['webpack/hot/poll?1000']),
    './src/server',
  ];

  const dllEntry = {
    vendor: deps,
  };

  const res = {
    name: isNode ? 'server' : 'client',
    watch: false,
    target: isNode ? 'node' : undefined,
    ...(isDll
      ? {
          node: {
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            ['aws-sdk']: 'empty',
            cluster: 'empty',
            module: 'empty',
            ['spawn-sync']: 'empty',
            ['node-gyp']: 'empty',
            ['npm']: 'empty',
            child_process: 'empty',
          },
        }
      : {
          node: {
            fs: 'empty',
          },
        }),
    ...(isNode
      ? {
          node: {
            __dirname: true,
            fs: true,
          },
        }
      : {}),
    recordsPath: path.join(__dirname, '../build/_records'),
    externals: isNode ? [nodeModules] : undefined,
    entry: isDll ? dllEntry : isNode ? nodeEntry : clientEntry,
    output,
    module: {
      rules: rules(CONFIG),
    },
    plugins: plugins(CONFIG),
    devtool: isProduction || isNode ? 'sourcemap' : 'eval',
    devServer: isNode
      ? undefined
      : {
          historyApiFallback: true,
        },
  };
  // console.log(res);
  return res;
};
