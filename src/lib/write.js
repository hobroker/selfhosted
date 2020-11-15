const { writeFileSync } = require('fs');
const { log } = require('./util');
const { FINAL_TEMPLATES_PATH } = require('./constants');

const write = json => {
  log(`writing ${FINAL_TEMPLATES_PATH}...`);
  const string = JSON.stringify(json, null, 2);

  writeFileSync(FINAL_TEMPLATES_PATH, string + '\n');

  log('...writing done');
};

module.exports = write;
