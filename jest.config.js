// const tsconfig = require('./tsconfig.json');
const { parse: parseTsConfig } = require('comment-json');
const { readFileSync } = require('fs');

const tsconfig = parseTsConfig(readFileSync('./tsconfig.json').toString());

const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);

module.exports = {
  preset: 'ts-jest',
  testMatch: ['**/tests/**/*.test.ts'],
  testEnvironment: 'node',
  moduleNameMapper,
};
