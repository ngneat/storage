module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  cacheDirectory: '<rootDir>/.cache',
  testMatch: ['<rootDir>/projects/ngneat/storage/**/*.spec.ts'],
  testPathIgnorePatterns: ['node_modules'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  collectCoverage: true,
  modulePathIgnorePatterns: ['mocks.spec.ts']
};
