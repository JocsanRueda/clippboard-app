// eslint.config.js
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default  [
  js.configs.recommended,

  {
    ignores: ['node_modules/**', 'dist/**', 'src-tauri/**', 'target/**'],
  },

  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        },
      },
      globals: {
     
        window: "readonly",
        document: "readonly",
        console: "readonly",
        module: "readonly",
        require: "readonly",
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      // Buenas prácticas TypeScript
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off',

      // Buenas prácticas React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-vars': 'error',

      // Reglas de hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Estilo de código
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'no-trailing-spaces': 'warn',
      'eol-last': ['warn', 'always'],
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'double'],
      'indent': ['warn', 2, { SwitchCase: 1 }],
      // Reglas de formato
      'jsx-quotes': ['error', 'prefer-double'], 
      'react/jsx-indent': ['error', 2], 
      'react/jsx-indent-props': ['error', 2], 
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
