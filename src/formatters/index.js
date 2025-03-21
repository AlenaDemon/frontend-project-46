import getStylish from './stylish.js';

const getFormat = (dataDiff, format = 'stylish') => {
  if (format === 'stylish') {
    return getStylish(dataDiff);
  }
  return null;
};
export default getFormat;
