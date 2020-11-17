const { join, resolve } = require('path');

const STACKS_DIRNAME = 'stacks';
const STACKS_JSON_FILENAME = 'stacks.json';

const DOCKER_STACK_FILE = 'docker-stack.yml';

const ROOT_PATH = resolve(__dirname, '../..');
const STACKS_DIR_PATH = join(ROOT_PATH, STACKS_DIRNAME);
const FINAL_FILE_PATH = join(ROOT_PATH, STACKS_JSON_FILENAME);

module.exports = {
  FINAL_FILE_PATH,
  DOCKER_STACK_FILE,
  STACKS_DIR_PATH,
};
