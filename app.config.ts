import { ConfigContext, ExpoConfig } from 'expo/config'
import FontLib from './assets/fonts/generated-lib-fonts'

const baseIdentifier = 'fr.en-marche.jecoute'
const basePackage = 'fr.en_marche.jecoute'

const setAssociatedDomain = (config: Partial<ExpoConfig>, associatedDomain: string) => {
  config.ios.associatedDomains = [`applinks:${associatedDomain}`, `webcredentials:${associatedDomain}`, `activitycontinuation:${associatedDomain}`]
  config.android.intentFilters[0].data[0].host = associatedDomain
}

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  config.plugins.push([
    'expo-font',
    {
      fonts: FontLib,
    },
  ])

  const profile = process.env.EAS_BUILD_PROFILE
  setAssociatedDomain(config, process.env.EXPO_PUBLIC_ASSOCIATED_DOMAIN)
  config.android.config.googleMaps.apiKey = process.env.EXPO_PUBLIC_ANDROID_GOOGLE_API

  if (!profile || profile === 'development') {
    config.name = 'Vox Dev'
    config.scheme = 'vox-dev'
    config.ios.bundleIdentifier = `${baseIdentifier}.development`
    config.android.package = `${basePackage}.development`
    if (profile === 'development') {
      config.ios.googleServicesFile = process.env.GOOGLE_SERVICES_IOS_PATH_DEVELOPMENT
      config.android.googleServicesFile = process.env.GOOGLE_SERVICES_ANDROID_PATH_DEVELOPMENT
    } else {
      config.ios.googleServicesFile = './config/GoogleService-Info.plist'
      config.android.googleServicesFile = './config/google-services.json'
    }
    config.android.adaptiveIcon.foregroundImage = './assets/developement/adaptive-icon.jpg'
    config.ios.icon = './assets/developement/icon.jpg'
  } else if (profile === 'production') {
    config.ios.bundleIdentifier = baseIdentifier
    config.android.package = basePackage
    config.ios.googleServicesFile = process.env.GOOGLE_SERVICES_IOS_PATH_PRODUCTION
    config.android.googleServicesFile = process.env.GOOGLE_SERVICES_ANDROID_PATH_PRODUCTION
  } else {
    config.name = 'Vox Staging'
    config.scheme = 'vox-staging'
    config.android.adaptiveIcon.foregroundImage = './assets/staging/adaptive-icon.jpg'
    config.ios.icon = './assets/staging/icon.jpg'
    config.ios.bundleIdentifier = `${baseIdentifier}.${profile}`
    config.android.package = `${basePackage}.${profile}`
    config.ios.googleServicesFile = process.env.GOOGLE_SERVICES_IOS_PATH_STAGING
    config.android.googleServicesFile = process.env.GOOGLE_SERVICES_ANDROID_PATH_STAGING
  }

  config.extra.storybookEnabled = process.env.STORYBOOK_ENABLED

  return config
}
