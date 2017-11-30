// @flow

import 'isomorphic-fetch';
import createVorpal from 'vorpal';
const vorpal = createVorpal();
import commands from './commands';
import Api from '../../config/api';

commands(vorpal);

const res = vorpal.parse(process.argv, { use: 'minimist' });
const cmdName = res._ ? res._[0] : '';

const cmd = vorpal.find(cmdName);

if (!cmd) {
  vorpal.exec('help');
  vorpal.delimiter('catl').show();
} else {
  const jsonStart = process.argv.indexOf('-j') || process.argv.indexOf('-json');

  let args = process.argv;
  if (jsonStart !== -1) {
    args[jsonStart + 1] = args[jsonStart + 1].split('"').join("\\'");
  }

  const origCmd = args.join(' ');

  console.log(origCmd);

  console.log(process.env.CIRCUIT);

  const CIRCUIT = process.env.CIRCUIT || 'development';

  const api = Api({ CIRCUIT });

  const Parse = require('parse/node').Parse;
  Parse.initialize(
    api.PARSE_APPLICATION_ID,
    api.PARSE_JAVASCRIPT_KEY,
    api.PARSE_MASTER_KEY,
  );
  Parse.Cloud.useMasterKey();
  if (CIRCUIT === 'development') {
    Parse.serverURL = 'https://c1-dev-parse.chef.one/parse';
  }
  if (CIRCUIT === 'production') {
    Parse.serverURL = 'https://c1-prod-parse.chef.one/parse';
  }

  global.Parse = Parse;

  vorpal.exec(origCmd);
}
