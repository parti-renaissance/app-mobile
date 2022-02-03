module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
    'plugin:security/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'security'],
}
