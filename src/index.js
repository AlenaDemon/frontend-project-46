/* eslint-disable consistent-return */
import path from 'path';
import fs from 'fs';
import parser from './parser.js';
import getDiff from './getDiff.js';
import getFormat from './formatters/index.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');
  const format1 = path.extname(filepath1);
  const format2 = path.extname(filepath2);
  const parsedData1 = parser(content1, format1);
  const parsedData2 = parser(content2, format2);
  const diffData = getDiff(parsedData1, parsedData2);
  return getFormat(diffData, format);
};
