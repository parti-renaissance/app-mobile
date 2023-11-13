/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: ['@react-native', 'plugin:security/recommended', 'prettier',  "plugin:@typescript-eslint/recommended-type-checked",
  "plugin:@typescript-eslint/stylistic-type-checked"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
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
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { prefer: "type-imports", fixStyle: "separate-type-imports" },
    ],
    "@typescript-eslint/no-misused-promises": [
      2,
      { checksVoidReturn: { attributes: false } },
    ],
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
  },
}

module.exports = config
