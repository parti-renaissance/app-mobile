import eslint from '@eslint/js'
import reactCompiler from 'eslint-plugin-react-compiler'
import tseslint from 'typescript-eslint'

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
  plugins: {
    'react-compiler': reactCompiler,
  },
  rules: {
    'no-console': 'warn',
    'react-compiler/react-compiler': 'warn',
  },
})
