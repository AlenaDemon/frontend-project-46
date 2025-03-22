import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
test('gendiff', () => {
  expect(gendiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
  )).toBe(readFile('result.txt'));
  expect(gendiff(
    getFixturePath('file1.yaml'),
    getFixturePath('file2.yaml'),
  )).toBe(readFile('result.txt'));
  expect(gendiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
    'plain',
  )).toBe(readFile('result2.txt'));
  expect(gendiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
    'json',
  )).toBe(readFile('result3.txt'));
});
