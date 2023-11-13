/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: ['@react-native', 'plugin:security/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'security', 'import'],
  env: {
    es2022: true,
    node: true,
  },
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@react-navigation/core',
            importNames: ['useFocusEffect'],
            message:
              'use useFocusEffect from @react-navigation/native instead (https://github.com/react-navigation/react-navigation/issues/6773#issuecomment-852996822)',
          },
        ],
        patterns: ['src/**'],
      },
    ],
  },
}

module.exports = config
