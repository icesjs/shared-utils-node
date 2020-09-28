module.exports = {
  testEnvironment: 'node',
  verbose: true,
  notify: false,
  collectCoverage: !process.env.SKIP_TEST_COVERAGE,
  coverageThreshold: {
    global: {
      branches: -100,
      functions: -100,
      lines: -100,
      statements: -100,
    },
  },
  testMatch: ['**/*.test.js'],
  testPathIgnorePatterns: ['.*/__fixtures__/.*'],
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
}
