import { reduceHors } from './utils';
import clear from './clear';
import load from './load';
import message from './message';

export default reduceHors(clear, load, message);
