// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

import webpack from 'webpack';
import CompressionPlugin from 'compression-webpack-plugin';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LogProgressPlugin from './LogProgressPlugin';
// import StatsPlugin from './StatsPlugin';
import HappyPack from 'happypack';
import S3Plugin from 'webpack-s3-plugin';
import type { TCONFIG } from '../src/config/type';

export default (CONFIG: TCONFIG) => {
  const { env: { NODE_ENV, WEBPACK_TARGET, DLL } } = CONFIG;

  const isDLL = DLL === 'vendor';
  const isNode = WEBPACK_TARGET === 'node';

  const isProduction = NODE_ENV === 'production';

  const flagsObject = {
    __CLIENT__: !isNode,
    __SERVER__: isNode,
    __DEVELOPMENT__: !isProduction,
    __DEV__: !isProduction,
    __DEVTOOLS__: !isProduction,
  };

  let plugins = [
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(CONFIG),
    }),
    new HappyPack({
      loaders: [
        {
          loader: 'babel-loader',
          presets: [['es2015', { modules: false }], 'react', 'stage-1'],
          plugins: isProduction
            ? [
                'es6-promise',
                'transform-runtime',
                'transform-export-extensions',
                'add-module-exports',
                'transform-decorators-legacy',
                'transform-react-display-name',
              ]
            : [
                'react-hot-loader/babel',
                'transform-runtime',
                'transform-export-extensions',
                'add-module-exports',
                'transform-decorators-legacy',
                'transform-react-display-name',
                [
                  'react-transform',
                  {
                    transforms: [
                      {
                        transform: 'react-transform-catch-errors',
                        imports: ['react', 'redbox-react'],
                      },
                    ],
                  },
                ],
              ],
        },
      ],
    }),

    // ...(isNode
    //   ? [new StatsPlugin('stats.node.json')]
    //   : [new StatsPlugin('stats.client.json')]),
    new LogProgressPlugin(),
    new webpack.IgnorePlugin(/server\/build/),
    new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /de/),
    // new BundleAnalyzerPlugin({
    //   // Can be `server`, `static` or `disabled`.
    //   // In `server` mode analyzer will start HTTP server to show bundle report.
    //   // In `static` mode single HTML file with bundle report will be generated.
    //   // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
    //   analyzerMode: 'server',
    //   // Host that will be used in `server` mode to start HTTP server.
    //   analyzerHost: '127.0.0.1',
    //   // Port that will be used in `server` mode to start HTTP server.
    //   analyzerPort: 8888,
    //   // Path to bundle report file that will be generated in `static` mode.
    //   // Relative to bundles output directory.
    //   reportFilename: 'report.html',
    //   // Automatically open report in default browser
    //   openAnalyzer: true,
    //   // If `true`, Webpack Stats JSON file will be generated in bundles output directory
    //   generateStatsFile: false,
    //   // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
    //   // Relative to bundles output directory.
    //   statsFilename: 'stats.json',
    //   // Options for `stats.toJson()` method.
    //   // For example you can exclude sources of your modules from stats file with `source: false` option.
    //   // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
    //   statsOptions: null,
    //   // Log level. Can be 'info', 'warn', 'error' or 'silent'.
    //   logLevel: 'info',
    // }),
  ];

  if (isProduction) {
    plugins = [
      ...plugins,

      ...[new ExtractTextPlugin('bundle.[contenthash].css')],
      new webpack.DefinePlugin({
        ...(isNode
          ? {}
          : {
              'process.env': {
                NODE_ENV: '"production"',
              },
            }),
        ...flagsObject,
      }),
      ...(isNode
        ? []
        : [
            new webpack.optimize.UglifyJsPlugin({
              compress: {
                screw_ie8: true,
                warnings: false,
              },
            }),
            new webpack.LoaderOptionsPlugin({
              minimize: true,
              debug: false,
            }),
            new CompressionPlugin({
              asset: '[path].gz[query]',
              algorithm: 'gzip',
              test: /\.js$|\.css$|\.html$/,
              threshold: 10240,
              minRatio: 1,
            }),
          ]),
    ];
  } else {
    plugins = [
      ...plugins,
      new WebpackNotifierPlugin({ excludeWarnings: true }),
      new webpack.DefinePlugin(flagsObject),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      ...(isNode
        ? []
        : isDLL
          ? [
              new webpack.DllPlugin({
                name: '[name]_lib',
                path: 'build/[name].manifest.json',
              }),
            ]
          : [
              new webpack.DllReferencePlugin({
                context: '.',
                manifest: require('../build/vendor.manifest.json'),
              }),
            ]),
    ];
  }

  if (isNode) {
    plugins = [
      ...plugins,
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false,
      }),
    ];
  }

  plugins = [
    ...plugins,
    new HtmlWebpackPlugin({
      template: 'my-index.html',
    }),
    ...(process.env.S3_BUCKET
      ? [
          new S3Plugin({
            // Exclude uploading of html
            exclude: /.*\.html$/,
            // s3Options are required
            s3Options: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
              region: 'eu-west-1',
            },
            s3UploadOptions: {
              ContentEncoding(fileName) {
                if (/\.gz/.test(fileName)) {
                  return 'gzip';
                }
              },
              Bucket: process.env.S3_BUCKET,
            },
          }),
        ]
      : []),
  ];

  return plugins;
};
