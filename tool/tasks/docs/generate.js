const { log } = require('../../util');

const walkServices = services => services.map(({ image, url }) =>
  `- [${image}](${url})`);

const walkStaks = stacks => stacks.map(({ name, services }) =>
  `1. **${name}**  
    ${walkServices(services).join('\n    ')}`);

const generate = stacks => {
  log(`generating Markdown from stacks`, '...');

  const data = walkStaks(stacks);
  const md = data.join('\n');

  log('...', 'done');

  return md;
};

module.exports = generate;
