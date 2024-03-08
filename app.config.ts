import { ExpoConfig, ConfigContext } from 'expo/config'

const baseIdentifier = 'fr.en-marche.jecoute'
const basePackage = 'fr.en_marche.jecoute'

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  const profile = process.env.EAS_BUILD_PROFILE
  if (!profile) {
    config.ios.bundleIdentifier = `${baseIdentifier}.staging`
    config.android.package = `${basePackage}.staging`
    config.ios.googleServicesFile = './config/GoogleService-Info.plist'
    config.android.googleServicesFile = './config/google-services.json'
    config.android.config.googleMaps.apiKey =
      process.env.EXPO_PUBLIC_ANDROID_GOOGLE_API_KEY_STAGING
  } else if (profile === 'production') {
    config.ios.bundleIdentifier = baseIdentifier
    config.android.package = basePackage
    config.ios.googleServicesFile =
      process.env.GOOGLE_SERVICES_IOS_PATH_PRODUCTION
    config.android.googleServicesFile =
      process.env.GOOGLE_SERVICES_ANDROID_PATH_PRODUCTION
    config.android.config.googleMaps.apiKey =
      process.env.EXPO_PUBLIC_ANDROID_GOOGLE_API_KEY_PRODUCTION
  } else {
    config.ios.bundleIdentifier = `${baseIdentifier}.${profile}`
    config.android.package = `${basePackage}.${profile}`
    config.ios.googleServicesFile = process.env.GOOGLE_SERVICES_IOS_PATH_STAGING
    config.android.googleServicesFile =
      process.env.GOOGLE_SERVICES_ANDROID_PATH_STAGING
    config.android.config.googleMaps.apiKey =
      process.env.EXPO_PUBLIC_ANDROID_GOOGLE_API_KEY_STAGIN
  }
  return config
}
