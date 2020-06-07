// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['./src/**/*.ts',
    '!<rootDir>/src/**/*-protocol.ts',
    '!**/protocols/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
    'json',
    'node'
  ],
  testMatch: ['**/src/**/*.spec.ts?(x)']
}
