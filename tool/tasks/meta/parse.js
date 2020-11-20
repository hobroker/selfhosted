const { readdirSync, readFileSync } = require('fs');
const path = require('path');
const YAML = require('yaml');
const { absolutPathTo, log } = require('../../util');
const { formatServiceEntry } = require('./facade');
const { DOCKER_STACK_FILE } = require('../../constants');

const stackToJson = filepath => {
  const content = readFileSync(filepath, 'utf8');
  const yaml = YAML.parse(content);

  return yaml;
};

const parseStack = dirpath => name => {
  log(`reading ${name}`)(1);
  const filepath = path.join(dirpath, name, DOCKER_STACK_FILE);
  const yaml = stackToJson(filepath);

  const services = Object.entries(yaml.services).map(formatServiceEntry);

  log()(-1);
  return {
    name,
    services,
  };
};

const parse = dirname => {
  log(`parsing ./${dirname}`, '...')(1);

  const dirpath = absolutPathTo(dirname);
  const stacks = readdirSync(dirpath);
  const data = stacks.map(parseStack(dirpath));

  log()(-1)('...', 'parsing done');

  return data;
};

module.exports = parse;
