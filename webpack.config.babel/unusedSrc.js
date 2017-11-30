var depcheck = require('depcheck');
var fs = require('fs');
var path = require('path');
var R = require('ramda');

function getDirectories(srcpath) {
  return fs
    .readdirSync(srcpath)
    .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory());
}

const options = {
  ignoreBinPackage: true, // ignore the packages with bin entry
  ignoreDirs: R.difference(getDirectories(process.cwd()), 'src'),
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
