import eslint from '@eslint/js'
import reactCompiler from 'eslint-plugin-react-compiler'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
  plugins: {
    'react-compiler': reactCompiler,
    'unused-imports': unusedImports,
  },
  rules: {
    'no-console': 'warn',
    'react-compiler/react-compiler': 'warn',
    'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
})
