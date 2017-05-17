'use strict';

const help = require('./lib/help');
const open = require('./lib/open');
const br = require('./lib/br');

module.exports = {
  help,
  open,
  br,
  default: help
};
