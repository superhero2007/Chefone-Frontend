// @flow

import ExtractTextPlugin from 'extract-text-webpack-plugin';

const cssModulesLoaders = [
  'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]',
  'autoprefixer-loader?browsers=last 2 version',
];

import type { TCONFIG } from '../src/config/type';
// 'monkey-hot-loader'
export default ({ env: { NODE_ENV, WEBPACK_TARGET } }: TCONFIG) => {
  const isProduction = NODE_ENV === 'production';
  const isNode = WEBPACK_TARGET === 'node';
  const styleLoader = isNode ? 'fake-style-loader' : 'style-loader';
  return [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: isProduction
        ? [
            'happypack/loader',
            ...(isNode
              ? []
              : ['strip-loader?strip[]=debug,strip[]=console.log']),
          ]
        : [...(isNode ? [] : []), 'happypack/loader'],
    },
    {
      test: /\.css$/,
      use: isProduction
        ? ExtractTextPlugin.extract({
            fallback: styleLoader,
            use: 'css-loader',
          })
        : [styleLoader, 'css-loader'],
    },
    {
      test: /\.module.less$/,
      use: isProduction
        ? ExtractTextPlugin.extract({
            fallback: styleLoader,
            use: [
              ...cssModulesLoaders,
              'less-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true',
            ],
          })
        : [styleLoader, ...cssModulesLoaders, 'less-loader'],
    },
    {
      test: /^((?!\.module).)*less$/,
      use: isProduction
        ? ExtractTextPlugin.extract({
            fallback: styleLoader,
            use: [
              `css-loader?importLoaders=1&sourceMap`,
              `autoprefixer-loader?browsers=last 2 version`,
              `less-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true`,
            ],
          })
        : [styleLoader, 'css-loader', 'less-loader'],
    },
    {
      test: /(\.md)$/,
      loader: 'html-loader!highlight-loader!markdown-loader',
    },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader?limit=10000&mimetype=application/font-woff',
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader?limit=10000&mimetype=application/font-woff',
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader?limit=10000&mimetype=application/octet-stream',
    },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader?limit=10000&mimetype=image/svg+xml',
    },
    {
      test: /\.(png|jpg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      ],
    },
    { test: /\.gif$/i, use: 'file-loader' },
  ];
};
