import js from '@eslint/js';
import ts from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules/', 'dist/', 'coverage/']
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  prettier,
  {
    rules: {
      'no-console': 'off'
    }
  }
];
