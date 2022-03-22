const {
  getAvailableEnvironments,
  getDefaultEnvironment,
} = require('../config/environments')
const paths = require('../config/paths')
const cmd = require('./_tools/cmd')
const { getEnv, readEnv, appendEnv } = require('./_tools/env')
const p = require('./_tools/preprocess')
const fs = require('fs-extra')
const path = require('path')
const { Buffer } = require('buffer')

const command = 'prepare [environment]'
const builder = {
  environment: {
    choices: getAvailableEnvironments(),
    default: getDefaultEnvironment(),
  },
}
const handler = ({ environment }) => {
  prepareAndroidLocalFiles()
  prepareIosLocalFiles()
  prepareReactNativeLocalFiles()
  prepare(environment)
  prepareFirebase(environment)
}

function prepareAndroidLocalFiles() {
  if (process.env.ANDROID_B64_GOOGLE_SERVICES_STAGING) {
    copyBase64File(
      process.env.ANDROID_B64_GOOGLE_SERVICES_STAGING,
      'android/app/src/staging/google-services.json',
    )
  }
  if (process.env.ANDROID_B64_GOOGLE_SERVICES_PRODUCTION) {
    copyBase64File(
      process.env.ANDROID_B64_GOOGLE_SERVICES_PRODUCTION,
      'android/app/src/production/google-services.json',
    )
  }
  if (process.env.ANDROID_B64_RELEASE_KEYSTORE) {
    copyBase64File(
      process.env.ANDROID_B64_RELEASE_KEYSTORE,
      'android/app/keystores/release.keystore',
    )
  }
  if (process.env.ANDROID_B64_FASTFILE_ENV_STAGING) {
    copyBase64File(
      process.env.ANDROID_B64_FASTFILE_ENV_STAGING,
      'android/fastlane/.env.staging',
    )
  }
  if (process.env.ANDROID_B64_FASTFILE_ENV_PRODUCTION) {
    copyBase64File(
      process.env.ANDROID_B64_FASTFILE_ENV_PRODUCTION,
      'android/fastlane/.env.production',
    )
  }
  if (process.env.ANDROID_B64_GRADLE_PROPERTIES) {
    copyBase64File(
      process.env.ANDROID_B64_GRADLE_PROPERTIES,
      'android/local.secret.properties',
    )
  }
}

function prepareIosLocalFiles() {
  if (process.env.IOS_B64_FASTLANE_ENV_DEFAULT) {
    copyBase64File(
      process.env.IOS_B64_FASTLANE_ENV_DEFAULT,
      'ios/fastlane/.env.default',
    )
  }
  if (process.env.IOS_B64_FASTLANE_ENV_STAGING) {
    copyBase64File(
      process.env.IOS_B64_FASTLANE_ENV_STAGING,
      'ios/fastlane/.env.staging',
    )
  }
  if (process.env.IOS_B64_FASTLANE_ENV_PRODUCTION) {
    copyBase64File(
      process.env.IOS_B64_FASTLANE_ENV_PRODUCTION,
      'ios/fastlane/.env.production',
    )
  }
  if (process.env.IOS_B64_FIREBASE_PLIST_STAGING) {
    copyBase64File(
      process.env.IOS_B64_FIREBASE_PLIST_STAGING,
      'config/firebase_plists/GoogleService-Info_Staging.plist',
    )
  }
  if (process.env.IOS_B64_FIREBASE_PLIST_PRODUCTION) {
    copyBase64File(
      process.env.IOS_B64_FIREBASE_PLIST_PRODUCTION,
      'config/firebase_plists/GoogleService-Info_Production.plist',
    )
  }
  if (process.env.IOS_B64_APP_STORE_CONNECT_API_KEY) {
    copyBase64File(
      process.env.IOS_B64_APP_STORE_CONNECT_API_KEY,
      'ios/fastlane/app_store_connect_api_key.json',
    )
  }
}

function prepareReactNativeLocalFiles() {
  if (process.env.RN_B64_ENV_STAGING) {
    copyBase64File(
      process.env.RN_B64_ENV_STAGING,
      'config/environments/.env.staging.local',
    )
  }
  if (process.env.RN_B64_ENV_PRODUCTION) {
    copyBase64File(
      process.env.RN_B64_ENV_PRODUCTION,
      'config/environments/.env.production.local',
    )
  }
}

function prepare(environment) {
  readEnv(environment)
  const env = getEnv()
  p(paths.configTemplate, paths.config, env)
  prepareAndroidResource(env)
  prepareXCConfig(env)
}

function prepareXCConfig(env) {
  fs.outputFileSync(paths.xcconfig, xcconfigInclude('release'))
  appendEnv(env, paths.xcconfig)
  fs.outputFileSync(paths.xcconfigDebug, xcconfigInclude('debug'))
  appendEnv(env, paths.xcconfigDebug)
}

function prepareAndroidResource(env) {
  p(paths.androidResourceTemplate, paths.androidResource, env)
}

function xcconfigInclude(configuration) {
  return (
    '#include "Pods/Target Support Files/Pods-JeMarche/Pods-JeMarche.' +
    configuration +
    '.xcconfig"\n'
  )
}

function prepareFirebase(environement) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const fromPath = path.resolve(
    paths.firebasePlists,
    'GoogleService-Info_' + capitalizeFirstLetter(environement) + '.plist',
  )
  const toPath = path.resolve(paths.ios, 'GoogleService-Info.plist')
  try {
    fs.removeSync(toPath)
    fs.copySync(fromPath, toPath, { overwrite: true })
  } catch (err) {
    console.error(err)
  }
}

function copyBase64File(data, outputPath) {
  const buffer = Buffer.from(data, 'base64')

  // Disabled because 'outputPath' is not a user input but comes from a constant used in this file
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(outputPath, buffer)
}

module.exports = { ...cmd(command, handler, builder), prepare }
