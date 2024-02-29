import 'ts-node/register' // Add this to import TypeScript files
import { ExpoConfig, ConfigContext } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'vox',
  slug: 'vox',
  scheme: 'vox',
  version: '1.0.0',
  owner: 'parti-renaissance',
  runtimeVersion: {
    policy: 'appVersion',
  },
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    bundleIdentifier: 'fr.en-marche.jecoute.staging',
    googleServicesFile:
      process.env[
        `GOOGLE_SERVICES_IOS_PATH_${process.env.EAS_BUILD_PROFILE === 'production' ? 'PRODUCTION' : 'STAGING'}`
      ],
    supportsTablet: true,
  },
  android: {
    googleServicesFile:
      process.env[
        `GOOGLE_SERVICES_ANDROID_PATH_${process.env.EAS_BUILD_PROFILE === 'production' ? 'PRODUCTION' : 'STAGING'}`
      ],

    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.partirenaissance.vox',
    permissions: [
      'android.permission.ACCESS_COARSE_LOCATION',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.FOREGROUND_SERVICE',
    ],
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
  plugins: [
    'expo-router',
    'sentry-expo',
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/Maax-Bold.ttf',
          './assets/fonts/Maax-Medium.ttf',
          './assets/fonts/Maax-Mediumitalic.ttf',
          './assets/fonts/Roboto-Italic.ttf',
          './assets/fonts/Roboto-Medium.ttf',
          './assets/fonts/Roboto-Regular.ttf',
        ],
      },
    ],
    'expo-localization',
    '@react-native-firebase/app',
    '@react-native-firebase/messaging',
    '@react-native-firebase/dynamic-links',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission:
          'Allow $(PRODUCT_NAME) to use your location.',
      },
    ],
  ],
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: '3b41ebc2-860e-4ccb-a101-5edc6b0c7558',
    },
  },
  experiments: {
    typedRoutes: true,
  },
  updates: {
    url: 'https://u.expo.dev/3b41ebc2-860e-4ccb-a101-5edc6b0c7558',
  },
})
