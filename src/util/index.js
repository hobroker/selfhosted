const { execSync } = require('child_process');

const exec = cmd => execSync(cmd, { encoding: 'utf8' }).trim();

const capitalize = string => string[0].toUpperCase() + string.slice(1);

const invariant = (condition, message = 'Invalid value') => {
  if (!condition) {
    throw new Error(message);
  }
};

const log = (...messages) => console.log('>', ...messages);

const run = ([ start, end ] = []) => fn => (...args) => {
  start && log(start + (end ? '...' : ''));

  const result = fn(...args);

  end && log(`...${end}`);

  return result;
};

module.exports = {
  capitalize,
  exec,
  invariant,
  log,
  run,
};
