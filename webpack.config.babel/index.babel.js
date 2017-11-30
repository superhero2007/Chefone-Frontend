//@flow
import createConfig from './createConfig';
import CONFIG from '../src/config/';

const { shouldBuildServer, shouldBuildClient } = CONFIG.env;

export default [
  ...(shouldBuildClient
    ? [
        createConfig({
          ...CONFIG,
          env: { ...CONFIG.env, WEBPACK_TARGET: 'web' }
        })
      ]
    : []),
  ...(shouldBuildServer
    ? [
        createConfig({
          ...CONFIG,
          env: { ...CONFIG.env, WEBPACK_TARGET: 'node' }
        })
      ]
    : [])
];
