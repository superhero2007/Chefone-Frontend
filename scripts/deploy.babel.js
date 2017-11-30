//@flow

import { deploySSH } from 'catl-deploy-ssh';
import deployDataFct from '../src/config/deployData';
import pkg from '../package.json';
import { printTree, middlewares } from 'catl-step';
import npmLog from 'npmlog';
import path from 'path';
import moment from 'moment';

import CONFIG from '../src/config';

const { env: { CIRCUIT, PORT, RELEASE } } = CONFIG;

const deployData = deployDataFct();
const HOME = process.env.HOME ? process.env.HOME : '~';
const machine = {
  host: deployData.host,
  username: deployData.username,
  privateKey: `${HOME}/.ssh/id_rsa`,
  agent: process.env.SSH_AUTH_SOCK,
};

npmLog.loglevel = 'silly';
const formattedCurrentTime = moment(new Date().getTime()).format(
  'YYYY-MM-DD-HH-mm-ss',
);

const wwwPath = '/var/www/';
const remoteRootPath = RELEASE ? wwwPath : wwwPath + 'stage';

const appName = `${pkg.name}${RELEASE ? '' : '_stage'}`;

const mapCircuit = {
  development: 'dev.chef.one',
  production: 'prod.chef.one',
};

const opts = {
  remoteMachine: machine,
  remotePath: remoteRootPath,
  circuitName: mapCircuit[CIRCUIT],
  appName,
  log: npmLog,
  projectPath: path.resolve(__dirname + '/..'),
  localFolder: path.resolve(__dirname + '/../dist'),
  entry: './src/server',
  port: PORT,
  restartProc: true,
  stepMiddleware: middlewares.logStep,
  buildVersion: formattedCurrentTime,
  changeLog: { q: 'change1', q1: 'change2', q2: 'change2' },
};

printTree(deploySSH);
deploySSH(opts);
