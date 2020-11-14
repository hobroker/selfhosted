const { readdirSync, readFileSync, writeFileSync } = require('fs');
const path = require('path');
const { exec, identity, invariant } = require('./util');

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

const metaFormatters = {
  categories: value => value.split`,`,
};

const extractMetaKeyValue = (line) => {
  const [ key, value ] = line.replace(/^#\s/, '').split`=`;
  invariant(key);
  invariant(value);

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

  const env = raw.map(line => {
    const [ name, defaultValue ] = line.match(/\${([^}]+)}/)[1].split`:-`;
    const [ , label ] = line.match(/\s#\s([^$]+)/);

    invariant(name);
    invariant(label);

    return {
      name,
      label,
      default: defaultValue,
    };
  });

  return env;
};

const apps = readdirSync(STACKS_PATH);

const generateTemplates = () => {
  let idx = 0;
  return apps.sort().flatMap(app => {
    const templateDir = path.join(STACKS_PATH, app);
    const templates = readdirSync(templateDir).map(file => {
      const type = TEMPLATE_TYPES[file];

      if (!type) {
        return null;
      }

      const stackfile = path.join(STACKS_SINGLE_DIR, app, file);
      const composeContent = readFileSync(stackfile, 'utf8');

      if (composeContent.startsWith('#no-touch#')) {
        return null;
      }

      const meta = extractMeta(composeContent);
      const env = extractEnv(composeContent);

      console.log(`${++idx}.`.padStart(5).padEnd(3), app);

      return {
        name: app,
        type,
        ...meta,
        repository: {
          url: GIT_ORIGIN,
          stackfile,
        },
        env,
      };
    });

    return templates.filter(Boolean);
  });
};

const log = message => console.log(`> ${message}`);

log('generating...');

const templates = generateTemplates();
const json = { version: '2', templates };
const string = JSON.stringify(json, null, 2);

log('writing the file...');
writeFileSync(FINAL_TEMPLATES_PATH, string + '\n');

log('done.');
