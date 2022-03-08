module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
    'plugin:security/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'security'],
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
