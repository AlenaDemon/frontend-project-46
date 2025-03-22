/* eslint-disable consistent-return */
import getStylish from './stylish.js';
import getPlain from './plain.js';

const getFormat = (dataDiff, format = 'stylish') => {
  if (format === 'stylish') {
    return getStylish(dataDiff);
  }
  if (format === 'plain') {
    return getPlain(dataDiff);
  }
};
export default getFormat;
