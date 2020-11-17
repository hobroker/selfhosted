const { execSync } = require('child_process');
const { resolve } = require('path');

const exec = cmd => execSync(cmd, { encoding: 'utf8' }).trim();

const capitalize = string => string[0].toUpperCase() + string.slice(1);

const assert = (condition, message = 'Invalid value') => {
  if (!condition) {
    throw new Error(message);
  }
};

let logIndent = 0;
const log = (...messages) => messages.length
  && console.log(`${'   '.repeat(logIndent)} >`, ...messages)
  || (indent => (logIndent += indent) && false || log);

const absolutPathTo = (...pathSegments) => resolve(__dirname, '../..', ...pathSegments);

module.exports = {
  absolutPathTo,
  capitalize,
  exec,
  assert,
  log,
};
