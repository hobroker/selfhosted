const { readdirSync, readFileSync, writeFileSync } = require('fs');
const path = require('path');
const { exec, identity, invariant } = require('./util');

const STACKS_DIR = 'stacks';
const DOCKER_COMPOSE_FILE = 'docker-stack.yml';
const FINAL_TEMPLATES_FILE = 'templates.json';

const GIT_ORIGIN = exec('git config --get remote.origin.url');
const ROOT_PATH = path.resolve(__dirname, '..');
const STACKS_PATH = path.join(ROOT_PATH, STACKS_DIR);
const FINAL_TEMPLATES_PATH = path.join(ROOT_PATH, FINAL_TEMPLATES_FILE);

const adjust = (template, app) => ({
  type: 2,
  name: app,
  repository: {
    url: GIT_ORIGIN,
    stackfile: `${STACKS_DIR}/${app}/${DOCKER_COMPOSE_FILE}`,
  },
  ...template,
});

const metaFormatters = {
  categories: value => value.split`,`,
};

const extractMetaKeyValue = (line) => {
  const [ key, value ] = line.replace(/^#\s/, '').split`=`;
  invariant(key, value);

  const formatter = metaFormatters[key] || identity;

  return [ key, formatter(value) ];
};

const extractMeta = content => {
  const lines = content.match(/^#.*/gm);
  const meta = lines
    .map(extractMetaKeyValue)
    .reduce((acc, [ key, value ]) => ({
      ...acc,
      [key]: value,
    }), {});

  return meta;
};

const extractEnv = content => {
  const raw = content.match(/\${.*}.*#.*/gm);

  const env = raw.reverse().map(line => {
    const [ name, defaultValue ] = line.match(/\${([^}]+)}/)[1].split`:-`;
    const [ , label ] = line.match(/\s#\s([^$]+)/);

    return {
      name,
      label,
      default: defaultValue,
    };
  });

  return env;
};

const apps = readdirSync(STACKS_PATH);

const templates = apps.sort().map(app => {
  const composePath = path.join(STACKS_PATH, app, DOCKER_COMPOSE_FILE);
  const composeContent = readFileSync(composePath, 'utf8');
  const merged = {
    ...extractMeta(composeContent),
    env: extractEnv(composeContent),
  };

  return adjust(merged, app);
});

const json = { version: '2', templates };

const string = JSON.stringify(json, null, 2);

writeFileSync(FINAL_TEMPLATES_PATH, string + '\n');
