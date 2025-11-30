import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true,
          allowExportNames: ['loader', 'action', 'ROUTES', 'NAV_ITEMS', 'buildRoute'],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  // ✅ Disable react-refresh rule for non-component files
  {
    files: [
      '**/*.config.{ts,js}',
      '**/routes/**/*.{ts,tsx}',
      '**/types/**/*.{ts,tsx}',
      '**/utils/**/*.{ts,tsx}',
      '**/hooks/**/*.{ts,tsx}',
      '**/api/**/*.{ts,tsx}',
      '**/redux/**/*.{ts,tsx}',
      '**/theme/**/*.{ts,tsx}',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  }
);
