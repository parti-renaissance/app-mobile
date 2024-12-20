import { ConfigContext, ExpoConfig } from 'expo/config'
import FontLib from './assets/fonts/generated-lib-fonts'

const baseIdentifier = 'fr.en-marche.jecoute'
const basePackage = 'fr.en_marche.jecoute'

interface ConfigOptions {
  name: string
  scheme?: string
  bundleIdentifier: string
  package: string
  googleServicesFileIos: string
  googleServicesFileAndroid: string
  adaptiveIcon?: string
  icon?: string
  notification?: {
    icon?: string
  }
}

const setAssociatedDomain = (config: Partial<ExpoConfig>, associatedDomain: string | undefined) => {
  if (!associatedDomain) return
  if (config.ios) {
    config.ios.associatedDomains = [`applinks:${associatedDomain}`, `webcredentials:${associatedDomain}`, `activitycontinuation:${associatedDomain}`]
  }
  if (config.android?.intentFilters?.[0]?.data?.[0]) {
    config.android.intentFilters[0].data[0].host = associatedDomain
  }
}

const applyConfig = (config: Partial<ExpoConfig>, options: ConfigOptions) => {
  config.name = options.name
  if (options.scheme) {
    config.scheme = options.scheme
  }
  if (config.ios) {
    config.ios.bundleIdentifier = options.bundleIdentifier
    config.ios.googleServicesFile = options.googleServicesFileIos
    if (options.icon) {
      config.ios.icon = options.icon
    }
  }
  if (config.android) {
    config.android.package = options.package
    config.android.googleServicesFile = options.googleServicesFileAndroid
    if (options.adaptiveIcon && config.android.adaptiveIcon) {
      config.android.adaptiveIcon.foregroundImage = options.adaptiveIcon
    }
    if (options.notification) {
      config.notification = { ...config.notification, ...options.notification }
    }
  }
}

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  if (config.plugins) {
    config.plugins.push([
      'expo-font',
      {
        fonts: FontLib,
      },
    ])
    config.plugins.push([
      '@rnmapbox/maps',
      {
        RNMapboxMapsDownloadToken: process.env.MAP_BOX_SECRET_KEY,
      },
    ])
    config.plugins.push(['expo-router', { origin: `https://${process.env.EXPO_PUBLIC_ASSOCIATED_DOMAIN}` }])
  }

  const profile = process.env.EAS_BUILD_PROFILE
  setAssociatedDomain(config, process.env.EXPO_PUBLIC_ASSOCIATED_DOMAIN)
  if (config.android?.config?.googleMaps) {
    config.android.config.googleMaps.apiKey = process.env.EXPO_PUBLIC_ANDROID_GOOGLE_API_KEY
  }

  if (!profile || profile === 'development') {
    applyConfig(config, {
      name: 'Vox Dev',
      scheme: 'vox-dev',
      bundleIdentifier: `${baseIdentifier}.development`,
      package: `${basePackage}.development`,
      googleServicesFileIos: profile === 'development' ? process.env.GOOGLE_SERVICES_IOS_PATH_DEVELOPMENT || '' : './config/GoogleService-Info.plist',
      googleServicesFileAndroid: profile === 'development' ? process.env.GOOGLE_SERVICES_ANDROID_PATH_DEVELOPMENT || '' : './config/google-services.json',
      adaptiveIcon: './assets/developement/adaptive-icon.png',
      icon: './assets/developement/icon.png',
      notification: {
        icon: './assets/developement/notif-icon.png',
      },
    })
  } else if (profile === 'production') {
    applyConfig(config, {
      name: process.env.EXPO_PUBLIC_APP_NAME || '',
      bundleIdentifier: baseIdentifier,
      package: basePackage,
      googleServicesFileIos: process.env.GOOGLE_SERVICES_IOS_PATH_PRODUCTION || '',
      googleServicesFileAndroid: process.env.GOOGLE_SERVICES_ANDROID_PATH_PRODUCTION || '',
      notification: {
        icon: './assets/notif-icon.png',
      },
    })
  } else {
    applyConfig(config, {
      name: process.env.EXPO_PUBLIC_APP_NAME || '',
      scheme: 'vox-staging',
      bundleIdentifier: `${baseIdentifier}.${profile}`,
      package: `${basePackage}.${profile}`,
      googleServicesFileIos: process.env.GOOGLE_SERVICES_IOS_PATH_STAGING || '',
      googleServicesFileAndroid: process.env.GOOGLE_SERVICES_ANDROID_PATH_STAGING || '',
      adaptiveIcon: './assets/staging/adaptive-icon.png',
      icon: './assets/staging/icon.png',
      notification: {
        icon: './assets/staging/notif-icon.png',
      },
    })
  }

  if (config.extra) {
    config.extra.storybookEnabled = process.env.STORYBOOK_ENABLED
  }

  return config
}
