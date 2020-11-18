const { log } = require('../../util');

const formatServiceEntry = ([name, service]) => {
  log(name);
  const image = service.image
    .replace(/:.*/, '')
    .split('/')
    .slice(-2)
    .join('/');

  return ({
    name,
    image,
    url: `https://hub.docker.com/r/${image}`,
  });
};

module.exports = { formatServiceEntry };
