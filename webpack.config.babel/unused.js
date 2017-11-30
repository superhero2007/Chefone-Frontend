var depcheck = require('depcheck');

const options = {
  ignoreBinPackage: true, // ignore the packages with bin entry
  ignoreDirs: [
    // folder with these names will be ignored
    'node_modules',
    'flow-coverage',
    'build',
    'dist',
    'flow-typed'
  ],
  ignoreMatches: [
    // ignore dependencies that matches these globs
    'babel-polyfill',
    'babel-runtime',
    'bootstrap',
    'react-input-slider'
  ],
  parsers: {
    // the target parsers
    '*.js': depcheck.parser.jsx
  },
  detectors: [
    depcheck.detector.requireCallExpression,
    depcheck.detector.importDeclaration
  ],
  specials: [
    // the target special parsers
    depcheck.special.eslint,
    depcheck.special.webpack
  ]
};

depcheck(process.cwd(), options, unused => {
  console.log(unused.dependencies); // an array containing the unused dependencies
  //   console.log(unused.devDependencies); // an array containing the unused devDependencies
  //   console.log(unused.missing); // an array containing the dependencies missing in `package.json`
  //   console.log(unused.using); // a lookup indicating each dependency is used by which files
});
