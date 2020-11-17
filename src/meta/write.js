const { writeFileSync } = require('fs');
const { FINAL_FILE_PATH } = require('./constants');
const { log } = require('../util');

const write = json => {
  log(`writing ${FINAL_FILE_PATH}...`);
  const string = JSON.stringify(json, null, 2);

  writeFileSync(FINAL_FILE_PATH, string + '\n');

  log('...writing done');
};

module.exports = write;
