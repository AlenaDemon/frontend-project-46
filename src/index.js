/* eslint-disable consistent-return */
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parser from './parser.js';

const genDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  const diff = keys.map((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return `  - ${key}: ${obj1[key]}`;
    }
    if (!Object.hasOwn(obj1, key)) {
      return `  + ${key}: ${obj2[key]}`;
    }
    if (obj1[key] !== obj2[key]) {
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }
    return `    ${key}: ${obj1[key]}`;
  });
  return `{\n${diff.join('\n')}\n}`;
};

export default (filepath1, filepath2) => {
  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');
  if (path.extname(filepath1) === '.json') {
    const parsedData1 = parser(content1, 'json');
    const parsedData2 = parser(content2, 'json');
    return genDiff(parsedData1, parsedData2);
  }
  if (path.extname(filepath1) === '.yaml') {
    const parsedData1 = parser(content1, 'yaml');
    const parsedData2 = parser(content2, 'yaml');
    return genDiff(parsedData1, parsedData2);
  }
};
