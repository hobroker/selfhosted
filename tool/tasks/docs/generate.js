const { log } = require('../../util');

let idx = 1;

const walkServices = services => services.map(({ name, image, url }) =>
  `<tr>
    <td>${idx++}</td>
    <td>${name}</td>
    <td><a href="${url}">${image}</a></td>
  </tr>`);

const walkStaks = stacks => stacks.map(({ name, services }) =>
  `<tr>
    <td>${idx++}</td>
    <td rowspan=${services.length}>${name}</td>
    <td>${services[0].name}</td>
    <td><a href="${services[0].url}">${services[0].image}</a></td>
  </tr>
  ${walkServices(services.slice(1)).join('\n    ')}`);

const generate = stacks => {
  log(`generating Markdown from stacks`, '...');

  const data = walkStaks(stacks);
  const body = data.join('\n');
  const table = `
<table>
  <thead>
    <tr>
      <th>Stack</th>
      <th>Service name</th>
      <th>URL</th>
      <th>N</th>
    </tr>
  </thead>
    <tbody>
      ${body}
    </tbody>
</table>`;

  log('...', 'done');

  return table;
};

module.exports = generate;
