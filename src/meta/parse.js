const { readdirSync, readFileSync } = require('fs');
const path = require('path');
const YAML = require('yaml');
const { log, identity, invariant } = require('../util');
const {
  DOCKER_STACK_FILE,
  STACKS_PATH,
} = require('./constants');

const stackToJson = name => {
  const filepath = path.join(STACKS_PATH, name, DOCKER_STACK_FILE);
  const content = readFileSync(filepath, 'utf8');
  const yaml = YAML.parse(content);

  return yaml;
};

const mapServiceEntries = entries => Object.entries(entries).map(([
  name,
  { image },
]) => ({
  name,
  image: image.replace(/:.*/, '').split('/').slice(-2).join('/'),
}));

const parseStack = name => {
  const yaml = stackToJson(name);

  const services = mapServiceEntries(yaml.services);

  return {
    name,
    services,
  };
};

const parse = () => {
  log('parse', STACKS_PATH);

  const list = readdirSync(STACKS_PATH);
  const data = list.map(parseStack);

  console.log(data);

  return data;
};

module.exports = parse;
