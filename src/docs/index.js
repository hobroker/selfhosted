const { STACKS_JSON_FILENAME } = require('../constants');
const { assert } = require('../util');

const validate = ({ file, dir }) => {
  assert(file && !file.startsWith('/'),
    '"file" must exist and not start with "/"');
};

const docs = ({
  file = STACKS_JSON_FILENAME,
}) => {
  validate({ file });

  console.log('hello');
};

module.exports = docs;
