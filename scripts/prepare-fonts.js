// crawl assets/fonts/ get all filesname .ttf recursively in all subdirectories
// path is relative to the root of the project
// output: [{fontName: 'Roboto-Black', path: 'assets/fonts/Roboto/Roboto-Black.ttf'}, ...]

const fs = require('fs')
const path = require('path')

const fontsDir = path.join(__dirname, '../assets/fonts')
const fonts = []

function crawl(dir) {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      crawl(filePath)
    } else {
      if (file.endsWith('.ttf')) {
        // start from the root of the project
        const relativePath = path.relative(path.join(__dirname, '../'), filePath)
        // output: [{fontName: 'Roboto-Black', path: 'assets/fonts/Roboto/Roboto-Black.ttf'}, ...]
        fonts.push({
          fontName: file.replace('.ttf', ''),
          path: relativePath,
        })
      }
    }
  })
}

crawl(fontsDir)

// map for expo useFonts

function mapForExpoUseFonts(fonts) {
  const objectProps = fonts.reduce((acc, font) => {
    acc += `'${font.fontName}': require('${font.path}'),\n`
    return acc
  }, '')
  return `export default {\n${objectProps}} as const;`
}

function mapForNativeFontsConfig(fonts) {
  const arrayProps = fonts.map(({ fontName, path }) => `./${path}`)
  return `module.exports = ${JSON.stringify(arrayProps)};`
}

// write to file
const outputNativeFontConfig = path.join(__dirname, '../assets/fonts/generated-lib-fonts.js')
fs.writeFileSync(outputNativeFontConfig, mapForNativeFontsConfig(fonts), 'utf-8')

// write to file
const outputExpoUseFonts = path.join(__dirname, '../assets/fonts/generated-lib-web-fonts.ts')
fs.writeFileSync(outputExpoUseFonts, mapForExpoUseFonts(fonts), 'utf-8')
