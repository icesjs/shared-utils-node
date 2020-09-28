module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  plugins: ['standard', 'jest', 'prettier'],
  extends: [
    'standard',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-process-exit': 'warn',
    'jest/no-disabled-tests': 'error',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'node/no-unsupported-features': 'off',
    'node/no-unpublished-require': 'off',
    'space-before-function-paren': 'off',
    'object-curly-spacing': 'off',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  ignorePatterns: ['lib/**', 'coverage/**'],
}
