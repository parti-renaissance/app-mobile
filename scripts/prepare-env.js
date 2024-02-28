const fs = require('fs')

function createEnvsKeys(_platform, profile) {
  console.log(process.env)
  const serverEnv = profile === 'production' ? 'PRODUCTION' : 'STAGING'
  console.log('serverEnv', serverEnv)
  const regex = new RegExp(`^EXPO_PUBLIC_.*_${serverEnv}$`)
  const publicEnvs = Object.keys(process.env).filter((key) => regex.test(key))
  console.log('publicEnvs', Object.keys(process.env))

  const envs = publicEnvs.reduce((acc, envName) => {
    const regex = `^EXPO_PUBLIC_(.*)_${serverEnv}$`
    const key = envName.match(regex)[1]
    acc[key] = process.env[envName]
    return acc
  }, {})

  const generatedConsts = Object.keys(envs).reduce((acc, key) => {
    acc += `export const ${key} = '${envs[key]}'\n`
    return acc
  }, '')

  const generatedFile = 'src/config/env.ts'
  fs.writeFileSync(generatedFile, generatedConsts)

  console.log('envs', envs)
}

createEnvsKeys(
  process.env['EAS_BUILD_PLATFORM'],
  process.env['EAS_BUILD_PROFILE'],
)
