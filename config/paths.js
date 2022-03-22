const path = require('path')

const { projectName } = require('./values')

// prettier-ignore
const paths = {
  android: r('android'),
  config: r('src/Config.ts'),
  configTemplate: r('commands/_templates/Config.ts'),
  environments: r('config/environments/.env'),
  ios: r('ios'),
  products: r('products'),
  productsEnv: r('products/.env'),
  root: r(),
  xcconfig: r('ios/Config.xcconfig'),
  xcconfigDebug: r('ios/ConfigDebug.xcconfig'),
  androidResource: r('android/app/src/main/res/values/config.xml'),
  androidResourceTemplate: r('commands/_templates/config.xml'),
  firebasePlists: r('config/firebase_plists')
}

function r() {
  return path.resolve.apply(null, [__dirname].concat('..', [...arguments]))
}

function getMappingsPath(platform) {
  return path.resolve(paths.products, platform, 'mappings')
}

function getPackagePath(format) {
  switch (format) {
    case 'aab':
    case 'apk':
      return path.resolve(paths.products, 'android', `${projectName}.${format}`)
    case 'ipa':
      return path.resolve(
        paths.products,
        'ios',
        projectName,
        `${projectName}.${format}`,
      )
    default:
      throw new Error(`Unsupported format "${format}".`)
  }
}

module.exports = paths
module.exports.getMappingsPath = getMappingsPath
module.exports.getPackagePath = getPackagePath
