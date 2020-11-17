const { STACKS_DIRNAME, STACKS_JSON_FILENAME } = require('../constants');
const { assert } = require('../util');
const parse = require('./parse');
const write = require('./write');

const validate = ({ file, dir }) => {
  assert(file && !file.startsWith('/'),
    '"file" must be a string and not start with "/"');
  assert(dir && !dir.startsWith('/'),
    '"dir" must exist and not start with "/"');
};

const meta = ({
  file = STACKS_JSON_FILENAME,
  dir = STACKS_DIRNAME,
}) => {
  validate({ file, dir });

  const json = parse(dir);

  write(json, file);
};

module.exports = meta;
