module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'eslint-config-prettier',
    'eslint-config-prettier/react',
  ],
  plugins: ['react', 'prettier'],
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
  rules: {
    'max-len': ['off', 80],
    'no-undef': 'off',
    'linebreak-style': ['error', 'unix'],
    'prettier/prettier': 'error',
    'react/prop-types': 'off',
  },
  overrides: [
    {
      files: ['*.js'],
      parser: 'babel-eslint',
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint/eslint-plugin'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
        ],

        'no-dupe-class-members': 'off',
        'no-unused-vars': 'off',
      },
    },
  ],
};
