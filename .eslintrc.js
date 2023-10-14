module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': 'airbnb-base',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'rules': {
    'indent': ['error', 2],
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'semi': ['error', 'always'],
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'func-names': 'off',
    'new-cap': 'off',
    'no-console': 'off'
  },
  'ignorePatterns': [
    'config/**/*',
    'npm/**/*',
    'playground/**/*',
    '.eslintrc.js'
  ],
};
