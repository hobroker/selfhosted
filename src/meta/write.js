const { writeFileSync } = require('fs');
const { STACKS_JSON_PATH } = require('./constants');
const { log } = require('../util');

const write = json => {
  log(`writing ${STACKS_JSON_PATH}...`);
  const string = JSON.stringify(json, null, 2);

  writeFileSync(STACKS_JSON_PATH, string + '\n');

  log('...writing done');
};

module.exports = write;
