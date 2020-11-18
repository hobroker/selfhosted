const { assert } = require('../util');
const tasks = require('./tasks');

const readArgs = () => {
  const raw = process.argv.slice(2);
  const args = {};
  let current;

  raw.forEach(arg => {
    if (arg.startsWith('--')) {
      const [ key, value ] = (([ key, value ]) => [
        key.replace(/-/g, ''),
        value,
      ]).call(null, arg.split('='));

      args[current][key] = value;
    } else {
      assert(tasks[arg], `"${arg}" task does not exist`);

      current = arg;
      args[current] = {};
    }
  });

  return args;
};

module.exports = readArgs;
