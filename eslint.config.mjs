import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettierConfig from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// These are the new standards for ESLint configuration since v9
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: { extends: [] },
});

const eslintConfig = [
  // .eslintignore has been removed since ESLint v9; use the ignores pattern in the config to exclude files from linting
  {
    ignores: ['node_modules', '.next', 'dist', 'coverage'],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    /**
     * Common Misconception is that when eslint plugins are added and extended as above they are automatically detected
     * But that is not the case.
     * Extends has one and only one job to enables the rules
     * If the rules are coming from 3rd party installed plugins, they need to be registered via the plugins key
     */
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      '@typescript-eslint': typescriptEslint,
    },
    /**
     * This are the custom rule set configuration object
     * @see https://eslint.org/docs/latest/use/configure/
     * This is basically an override to the default rule set that comes with the eslint plugins extended above
     */
    rules: {
      ...prettierConfig.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-filename-extension': [
        'warn',
        { extensions: ['.tsx', '.jsx'] },
      ],
      'jsx-a11y/anchor-is-valid': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];

export default eslintConfig;
