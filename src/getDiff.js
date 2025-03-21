import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const allKeys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)])).map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        action: 'child',
        key,
        value: getDiff(value1, value2),
      };
    }
    if (!Object.hasOwn(obj1, key)) {
      return {
        action: 'added',
        key,
        value: value2,
      };
    }
    if (!Object.hasOwn(obj2, key)) {
      return {
        action: 'delete',
        key,
        value: value1,
      };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        action: 'changed',
        key,
        value: value1,
        value2,
      };
    }
    if (obj1[key] === obj2[key]) {
      return {
        action: 'unchanged',
        key,
        value: value1,
      };
    }

    return null;
  });
  return allKeys;
};

export default getDiff;
