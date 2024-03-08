const fs = require('fs')

function createEnvsKeys(_platform, profile) {
  const serverEnv = profile === 'production' ? 'PRODUCTION' : 'STAGING'
  const regex = new RegExp(`^EXPO_PUBLIC_.*_${serverEnv}$`)
  const publicEnvs = Object.keys(process.env).filter((key) => regex.test(key))

  const envs = publicEnvs.reduce((acc, envName) => {
    const regex = `^EXPO_PUBLIC_(.*)_${serverEnv}$`
    const key = envName.match(regex)[1]
    acc[key] = process.env[envName]
    return acc
  }, {})

  let generatedConsts = Object.keys(envs).reduce((acc, key) => {
    acc += `export const ${key} = '${envs[key]}'\n`
    return acc
  }, '')

  if (!envs.ENVIRONMENT) {
    generatedConsts += `export const ENVIRONMENT = '${serverEnv.toLowerCase()}'\n`
  }

  const generatedFile = 'src/config/env.ts'
  fs.writeFileSync(generatedFile, generatedConsts)
}

createEnvsKeys(
  process.env['EAS_BUILD_PLATFORM'],
  process.env['EAS_BUILD_PROFILE'],
)
