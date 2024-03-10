/** @typedef  {import("prettier").Config} PrettierConfig */
/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: ['^(react/(.*)$)|^(react$)|^(react-native(.*)$)', '<THIRD_PARTY_MODULES>', '^~/', '^[../]', '^[./]'],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '4.4.0',
  endOfLine: 'lf',
  printWidth: 160,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
}

module.exports = config
