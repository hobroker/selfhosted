const { execSync } = require('child_process');
const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');

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

const readJsonFile = filepath => JSON.parse(readFileSync(filepath, 'utf8'));

module.exports = {
  absolutPathTo,
  assert,
  capitalize,
  exec,
  log,
  readJsonFile,
};
