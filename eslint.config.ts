module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['node_modules/'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'import/prefer-default-export': 'warn',
    'import/no-cycle': 'warn',
    'react/button-has-type': [
      'error',
      {
        button: true,
        submit: true,
        reset: true,
      },
    ],
    'react/display-name': 0,
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-declaration', 'arrow-function'],
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/react-in-jsx-scope': 0,
    'react-hooks/exhaustive-deps': 'warn',
    'react/require-default-props': [
      'error',
      {
        functions: 'defaultArguments',
      },
    ],
  },
};
