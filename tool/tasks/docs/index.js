const generate = require('./generate');
const updateReadme = require('./updateReadme');
const { STACKS_JSON_FILENAME } = require('../../constants');
const {
  assert,
  absolutPathTo,
  readJsonFile,
} = require('../../util');

const validate = ({ file }) => {
  assert(file && !file.startsWith('/'),
    '"file" must exist and not start with "/"');
};

const docs = ({
  file = STACKS_JSON_FILENAME,
}) => {
  validate({ file });
  const json = readJsonFile(absolutPathTo(file));

  const md = generate(json);

  updateReadme(md);
};

module.exports = docs;

