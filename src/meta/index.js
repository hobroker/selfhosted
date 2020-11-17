const { log } = require('../util');
const parse = require('./parse');
const write = require('./write');

const done = () => {
  log('done');

  process.exit(0);
};

const main = () => {
  const json = parse();

  write(json);

  done();
};

main();
