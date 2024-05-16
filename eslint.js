module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  pluging: ['prettier', 'eslint-plugin-react-compiler'],
  extends: ['universe/native', 'prettier', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'no-console': 'warn',
    'react-compiler/react-compiler': 2,
  },
}
