import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  // Browser/React files
  {
    files: ['src/**/*.{js,jsx}'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': ['error', { varsIgnorePattern: '^_|^[A-Z]', argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
      // These rules are overly strict for valid React patterns
      // setState in useEffect is valid for synchronizing with external state changes
      'react-hooks/exhaustive-deps': 'warn',
      // Disable overly strict rules that flag valid React patterns
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/purity': 'off',
    },
  },
  // Node.js API files (Vercel serverless functions)
  {
    files: ['api/**/*.js'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        process: 'readonly',
        Buffer: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^_|^[A-Z]', argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
    },
  },
]
