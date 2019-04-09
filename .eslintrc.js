module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'eslint-config-prettier',
    'eslint-config-prettier/react',
  ],
  settings: {
    react: {
      pragma: 'React',
      version: '16.3',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'max-len': ['off', 80],
    'no-undef': 'off',
    'linebreak-style': ['error', 'unix'],

    'react/prop-types': 'off',

    'prettier/prettier': 'error',
  },
}
