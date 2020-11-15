const { execSync } = require('child_process');

const exec = cmd => execSync(cmd, { encoding: 'utf8' }).trim();

const capitalize = string => string[0].toUpperCase() + string.slice(1);

const invariant = (condition, message = 'Invalid value') => {
  if (!condition) {
    throw new Error(message);
  }
};

const identity = value => value;

const log = (...messages) => console.log('>', ...messages);

module.exports = {
  capitalize,
  exec,
  identity,
  invariant,
  log,
};
