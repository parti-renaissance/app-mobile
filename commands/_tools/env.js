/* eslint-disable security/detect-non-literal-fs-filename */
// cli.js depends on a WHITELISTED use input. Injection is prevented this way
const dotenv = require('dotenv')
const fs = require('fs-extra')

const paths = require('../../config/paths')

function getEnv() {
  return Object.keys(process.env)
    .filter((key) => /(?:^NODE_ENV$)|(?:^RN_)|(?:^ANDROID_)/i.test(key))
    .reduce((env, key) => ({ ...env, [key]: process.env[String(key)] }), {})
}

function readEnv(environment) {
  config(`${paths.environments}.${environment}.local`)
  config(`${paths.environments}.${environment}`)
  config(`${paths.environments}.local`)
  config(paths.environments)
}

function config(path) {
  if (fs.existsSync(path)) {
    const { error } = dotenv.config({ path })
    if (error !== undefined) {
      throw error
    }
  }
}

function writeEnv(env, path) {
  fs.outputFileSync(path, stringifyEnv(env))
}

function appendEnv(env, path) {
  fs.appendFileSync(path, stringifyEnv(env))
}

function stringifyEnv(env) {
  return Object.keys(env).reduce(
    (str, key) => `${str}${key}=${env[String(key)]}\n`,
    '',
  )
}

module.exports = { getEnv, readEnv, writeEnv, appendEnv }
