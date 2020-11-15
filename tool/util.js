const { execSync } = require('child_process');

const exec = cmd => execSync(cmd, { encoding: 'utf8' }).trim();

const capitalize = string => string[0].toUpperCase() + string.slice(1);

const invariant = (...values) => values.forEach(value => console.assert(value));

const identity = value => value;

module.exports = {
  capitalize,
  exec,
  identity,
  invariant,
};
