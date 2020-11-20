const { log } = require('../util');
const readArgs = require('./readArgs');
const tasks = require('./tasks');

const runTasks = args => {
  const entries = Object.entries(args);
  log(`Running tasks`, Object.keys(args))(1);

  for (const [ name, taskArgs ] of entries) {
    const task = tasks[name];

    log(`Running task: ${name}`, '...')(1);

    task(taskArgs);

    log()(-1)('...', `task "${name}" done`);
  }

  log()(-1)('all tasks done\n');
};

const run = () => {
  const args = readArgs();

  if (Object.keys(args).length === 0) {
    log('No tasks specified');
  } else {
    runTasks(args);
  }

  process.exit(0);
};

module.exports = run;
