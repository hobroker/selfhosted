const { assert, log } = require('./util');
const meta = require('./meta');
const docs = require('./docs');

const tasks = {
  meta,
  docs,
};

const getArgs = () => {
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

const main = () => {
  const args = getArgs();

  log(`Running tasks`, Object.keys(args))(1);

  for (const name in args) {
    const task = tasks[name];
    const taskArgs = args[name];

    log(`Running task: ${name}`, '...')(1);

    task(taskArgs);

    log()(-1)('...', `task "${name}" done`);
  }

  log()(-1)('all tasks done\n');

  process.exit(0);
};

main();
