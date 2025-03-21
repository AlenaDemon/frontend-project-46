#!/usr/bin/env node
import { Command } from 'commander';
import app from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-v, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const result = app(filepath1, filepath2, program.opts().format);
    console.log(result);
  });
program.parse();
