import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;
const getStartIndent = (depth) => replacer.repeat(depth * spacesCount - 2);
const getBracketIndent = (depth) => replacer.repeat(depth * spacesCount - spacesCount);
const getStringify = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${getStartIndent(depth)}  ${key}: ${getStringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${getBracketIndent(depth)}}`,
  ].join('\n');
};

const signs = {
  added: '+ ',
  deleted: '- ',
  unchanged: '  ',
};

const getStylish = (diffData) => {
  const iter = (innerTree, depth = 1) => {
    const result = innerTree.map((key) => {
      switch (key.action) {
        case 'removed':
          return `${getStartIndent(depth)}${signs.deleted}${key.key}: ${getStringify(key.value, depth + 1)}`;
        case 'added':
          return `${getStartIndent(depth)}${signs.added}${key.key}: ${getStringify(key.value, depth + 1)}`;
        case 'updated':
          return `${getStartIndent(depth)}${signs.deleted}${key.key}: ${getStringify(key.value, depth + 1)}\n${getStartIndent(depth)}${signs.added}${key.key}: ${getStringify(key.value2, depth + 1)}`;
        case 'child':
          return `${getStartIndent(depth)}${signs.unchanged}${key.key}: ${iter(key.value, depth + 1)}`;
        default:
          return `${getStartIndent(depth)}${signs.unchanged}${key.key}: ${getStringify(key.value, depth + 1)}`;
      }
    });
    return [
      '{',
      ...result,
      `${getBracketIndent(depth)}}`,
    ].join('\n');
  };
  return iter(diffData);
};
export default getStylish;
