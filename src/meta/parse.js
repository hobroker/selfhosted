const { readdirSync, readFileSync } = require('fs');
const path = require('path');
const YAML = require('yaml');
const { log } = require('../util');
const {
  DOCKER_STACK_FILE,
  STACKS_DIR_PATH,
} = require('./constants');

const stackToJson = name => {
  const filepath = path.join(STACKS_DIR_PATH, name, DOCKER_STACK_FILE);
  const content = readFileSync(filepath, 'utf8');
  const yaml = YAML.parse(content);

  return yaml;
};

const mapServiceEntries = entries => Object.entries(entries).map(([
  name,
  stack,
]) => {
  const image = stack.image.replace(/:.*/, '').split('/').slice(-2).join('/');

  return ({
    name,
    image,
    url: `https://hub.docker.com/r/${image}`,
  });
});

const parseStack = name => {
  const yaml = stackToJson(name);

  const services = mapServiceEntries(yaml.services);

  return {
    name,
    services,
  };
};

const parse = () => {
  log('parse', STACKS_DIR_PATH);

  const list = readdirSync(STACKS_DIR_PATH);
  const data = list.map(parseStack);

  return data;
};

module.exports = parse;
