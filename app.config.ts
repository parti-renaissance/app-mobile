import { ConfigContext, ExpoConfig } from 'expo/config'
import FontLib from './assets/fonts/generated-lib-fonts'

const baseIdentifier = 'fr.en-marche.jecoute'
const basePackage = 'fr.en_marche.jecoute'

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  config.plugins.push([
    'expo-font',
    {
      fonts: FontLib,
    },
  ])

  const profile = process.env.EAS_BUILD_PROFILE
  if (!profile) {
    config.name = 'Vox Dev'
    config.ios.bundleIdentifier = `${baseIdentifier}.staging`
    config.android.package = `${basePackage}.staging`
    config.ios.googleServicesFile = './config/GoogleService-Info.plist'
    config.android.googleServicesFile = './config/google-services.json'
    config.android.config.googleMaps.apiKey = process.env.EXPO_PUBLIC_ANDROID_GOOGLE_API_KEY_STAGING
    config.android.adaptiveIcon.foregroundImage = './assets/developement/adaptive-icon.jpg'
    config.ios.icon = './assets/developement/icon.jpg'
  } else if (profile === 'production') {
    config.ios.bundleIdentifier = baseIdentifier
    config.android.package = basePackage
    config.ios.googleServicesFile = process.env.GOOGLE_SERVICES_IOS_PATH_PRODUCTION
    config.android.googleServicesFile = process.env.GOOGLE_SERVICES_ANDROID_PATH_PRODUCTION
    config.android.config.googleMaps.apiKey = process.env.EXPO_PUBLIC_ANDROID_GOOGLE_API_KEY_PRODUCTION
  } else if (profile === 'development') {
    config.name = 'Vox Dev'
    config.ios.bundleIdentifier = `${baseIdentifier}.${profile}`
    config.android.package = `${basePackage}.${profile}`
    config.android.adaptiveIcon.foregroundImage = './assets/developement/adaptive-icon.jpg'
    config.ios.icon = './assets/developement/icon.jpg'
    config.ios.googleServicesFile = process.env.GOOGLE_SERVICES_IOS_PATH_DEVELOPMENT
    config.android.googleServicesFile = process.env.GOOGLE_SERVICES_ANDROID_PATH_DEVELOPMENT
    config.android.config.googleMaps.apiKey = process.env.EXPO_PUBLIC_ANDROID_GOOGLE_API_KEY_STAGING
  } else {
    config.name = 'Vox Staging'
    config.android.adaptiveIcon.foregroundImage = './assets/staging/adaptive-icon.jpg'
    config.ios.icon = './assets/staging/icon.jpg'
    config.ios.bundleIdentifier = `${baseIdentifier}.${profile}`
    config.android.package = `${basePackage}.${profile}`
    config.ios.googleServicesFile = process.env.GOOGLE_SERVICES_IOS_PATH_STAGING
    config.android.googleServicesFile = process.env.GOOGLE_SERVICES_ANDROID_PATH_STAGING
    config.android.config.googleMaps.apiKey = process.env.EXPO_PUBLIC_ANDROID_GOOGLE_API_KEY_STAGING
  }

  config.extra.storybookEnabled = process.env.STORYBOOK_ENABLED

  return config
}
