const path = require('path');

const STACKS_DIRNAME = 'stacks';
const STACKS_JSON_FILENAME = 'stacks.json';

const DOCKER_STACK_FILE = 'docker-stack.yml';

const ROOT_PATH = path.resolve(__dirname, '../..');
const STACKS_PATH = path.join(ROOT_PATH, STACKS_DIRNAME);
const STACKS_JSON_PATH = path.join(ROOT_PATH, STACKS_JSON_FILENAME);

module.exports = {
  DOCKER_STACK_FILE,
  STACKS_JSON_FILENAME,
  STACKS_JSON_PATH,
  ROOT_PATH,
  STACKS_PATH,
  STACKS_DIRNAME,
};
