module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  pluging: ['prettier'],
  extends: [
    'universe/native',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
}
