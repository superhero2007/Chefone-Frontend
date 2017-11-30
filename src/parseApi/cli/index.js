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

  const api = Api({ CIRCUIT: 'development' });

  const Parse = require('parse/node').Parse;
  Parse.initialize(
    api.PARSE_APPLICATION_ID,
    api.PARSE_JAVASCRIPT_KEY,
    api.MASTER_KEY,
  );
  global.Parse = Parse;

  vorpal.exec(origCmd);
}
