const fs = require('fs')

function createGoogleServicesFile(_platform, profile) {
  if (!_platform) {
    createGoogleServicesFile('ANDROID', profile)
    createGoogleServicesFile('IOS', profile)
    return
  }

  if (!profile) {
    createGoogleServicesFile(_platform, 'STAGING')
    return
  }

  const platform = _platform.toUpperCase()
  if (platform === 'WEB') return

  const env = profile.toUpperCase() === 'PRODUCTION' ? 'PRODUCTION' : 'STAGING'

  const googleServices = process.env[`GOOGLE_SERVICES_${platform}_${env}`]

  if (!googleServices) {
    throw new Error(
      `Missing google-services_${platform}_${env} environment variable`,
    )
  }

  const googleServicesPath = `config/${platform}/google-services.${platform === 'ANDROID' ? 'json' : 'plist'}`

  fs.writeFileSync(
    googleServicesPath,
    Buffer.from(googleServices, 'base64').toString('utf-8'),
  )
}
createGoogleServicesFile(
  process.env['EAS_BUILD_PLATFORM'],
  process.env['EAS_BUILD_PROFILE'],
)
