module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2020: true,
    jest: true,
  },
  // 'extends': 'eslint:recommended',
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    indent: [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'never',
    ],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always',
    ],
    'arrow-spacing': [
      'error', { before: true, after: true },
    ],
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': 0,
    'import/no-extraneous-dependencies': [
      'error', { devDependencies: true, optionalDependencies: false, peerDependencies: false }],
  },
}
