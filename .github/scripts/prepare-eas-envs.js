/**
 * function that take all var that begin with EXPO_PUBLIC_ and add them to eas.json file
 *
 */
const fs = require('fs')
const path = require('path')

const profile = process.env.EAS_BUILD_PROFILE

const easJsonPath = path.resolve(__dirname, './../../eas.json')
const getEnvs = () => {
  const envs = {}
  Object.keys(process.env).forEach((key) => {
    if (key.startsWith('EXPO_PUBLIC_')) {
      envs[key] = process.env[key]
    }
  })
  return envs
}

const addEnvsToEasJson = () => {
  const easJson = JSON.parse(fs.readFileSync(easJsonPath, 'utf8'))
  easJson.build[profile].env = getEnvs()
  fs.writeFileSync(easJsonPath, JSON.stringify(easJson, null, 2))
  console.log(`Added envs to eas.json`)
}

if (!profile) {
    console.warn('No EAS_BUILD_PROFILE provided, skipping adding envs to eas.json')
    return
}
addEnvsToEasJson()
