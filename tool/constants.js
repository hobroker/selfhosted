const { absolutPathTo } = require('./util');

const STACKS_DIRNAME = 'stacks';
const STACKS_JSON_FILENAME = 'stacks.json';
const README_FILENAME = 'README.md';
const README_FILEPATH = absolutPathTo('README.md');

const DOCKER_STACK_FILE = 'docker-stack.yml';

module.exports = {
  STACKS_DIRNAME,
  STACKS_JSON_FILENAME,
  DOCKER_STACK_FILE,
  README_FILENAME,
  README_FILEPATH,
};
