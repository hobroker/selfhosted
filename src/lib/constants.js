const path = require('path');
const { exec } = require('./util');

const STACKS_SINGLE_DIR = 'stacks/single';
const FINAL_TEMPLATES_FILE = 'templates.json';

const DOCKER_COMPOSE_FILE = 'docker-compose.yml';
const DOCKER_STACK_FILE = 'docker-stack.yml';
const TEMPLATE_TYPES = {
  [DOCKER_STACK_FILE]: 2,
  [DOCKER_COMPOSE_FILE]: 3,
};

const GIT_ORIGIN = exec('git config --get remote.origin.url');
const ROOT_PATH = path.resolve(__dirname, '..');
const STACKS_PATH = path.join(ROOT_PATH, STACKS_SINGLE_DIR);
const FINAL_TEMPLATES_PATH = path.join(ROOT_PATH, FINAL_TEMPLATES_FILE);

module.exports = {
  DOCKER_COMPOSE_FILE,
  DOCKER_STACK_FILE,
  FINAL_TEMPLATES_FILE,
  FINAL_TEMPLATES_PATH,
  GIT_ORIGIN,
  ROOT_PATH,
  STACKS_PATH,
  STACKS_SINGLE_DIR,
  TEMPLATE_TYPES,
};
