const stacksContentRegex = /(?<=Stacks\n---\n\n)([\S\s]*)(?=\n\n---)/;

const { writeFileSync, readFileSync } = require('fs');
const { README_FILEPATH, README_FILENAME } = require('../../constants');
const { log } = require('../../util');

const updateReadme = string => {
  log(`writing ./${README_FILENAME}`, '...');

  const readme = readFileSync(README_FILEPATH, 'utf8');
  const newReadme = readme.replace(stacksContentRegex, string);

  writeFileSync(README_FILEPATH, newReadme);

  log('...', 'writing done');
};

module.exports = updateReadme;

