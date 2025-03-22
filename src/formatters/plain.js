import _ from 'lodash';

const getStringify = (value) => {
  if (typeof value === 'object') {
    return value === null ? null : '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getPlain = (diffData) => {
  const iter = (innerTree, path) => {
    const newPath = path === '' ? `${innerTree.key}` : `${path}.${innerTree.key}`;
    switch (innerTree.action) {
      case 'removed':
        return `Property '${newPath}' was removed`;
      case 'added':
        return `Property '${newPath}' was added with value: ${getStringify(innerTree.value)}`;
      case 'updated':
        return `Property '${newPath}' was updated. From ${getStringify(innerTree.value)} to ${getStringify(innerTree.value2)}`;
      case 'child':
        return innerTree.value.flatMap((child) => iter(child, newPath));
      default:
        return [];
    }
  };
  return _.sortBy(diffData.flatMap((node) => iter(node, '')).join('\n'));
};

export default getPlain;
