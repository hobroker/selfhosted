const { readdirSync, readFileSync } = require('fs');
const path = require('path');
const { log, identity, invariant } = require('./util');
const {
  STACKS_SINGLE_DIR,
  TEMPLATE_TYPES,
  GIT_ORIGIN,
  STACKS_PATH,
} = require('./constants');

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

const generateTemplates = (apps) => {
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

const parse = () => {
  log('parse', STACKS_PATH);

  const apps = readdirSync(STACKS_PATH);
  const templates = generateTemplates(apps);

  return {
    version: '2',
    templates,
  };
};

module.exports = parse;
