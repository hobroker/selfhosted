const { writeFileSync } = require('fs');
const { absolutPathTo, log } = require('../../util');

const write = (json, filename) => {
  log(`writing ./${filename}`, '...');

  const filepath = absolutPathTo(filename);
  const string = JSON.stringify(json, null, 2);
  writeFileSync(filepath, string + '\n');

  log('...', 'writing done');
};

module.exports = write;
