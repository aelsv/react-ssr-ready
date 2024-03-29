module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  settings: {
    'import/resolve': {
      'import/parser': 'babel-eslint',
      moduleDirectory: ['node_modules', './src'],
    },
  },
  rules: {
    radix: 0,
    'no-console': 0,
    'comma-dangle': 0,
    'global-require': 0,
    'import/imports-first': 0,
    'import/no-unresolved': 0,
    'object-curly-newline': 0,
    'import/extensions': 0,
    'no-duplicate-imports': 1,
    'no-underscore-dangle': 0,
    'no-case-declarations': 0,
    'class-methods-use-this': 0,
    'no-extra-boolean-cast': 0,
    'react/no-danger': 0,
    'import/order': 0,
    'import/no-named-as-default': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-dynamic-require': 0,
    'react/forbid-prop-types': 0,
    'react/no-unused-prop-types': 0,
    'react/require-extension': 0,
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'no-unused-expressions': 0,
    'no-alert': 0,
    'no-plusplus': 0,
    'react/jsx-filename-extension': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        tabWidth: 2,
        printWidth: 120,
        semi: true,
        useTabs: false,
        singleQuote: true,
        bracketSpacing: true,
      },
    ],
  },
};
