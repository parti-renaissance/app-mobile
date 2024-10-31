import '@testing-library/jest-native/extend-expect'

require('react-native-reanimated').setUpTests()

jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'))
jest.mock('@sentry/react-native', () => ({ init: () => jest.fn() }))
jest.mock('expo-constants', () => {
  return {
    __esModule: true,
    extra: {
      supabaseUrl: 'https://id.supabase.co',
      anonKey: 'id',
      bucket: 'bucket-dev',
    },
    version: '1.0.0',
    name: 'name',
    slug: 'slug',
  }
})

jest.mock('expo-file-system', () => ({
  downloadAsync: jest.fn(() => Promise.resolve({ md5: 'md5', uri: 'uri' })),
  getInfoAsync: jest.fn(() => Promise.resolve({ exists: true, md5: 'md5', uri: 'uri' })),
  readAsStringAsync: jest.fn(() => Promise.resolve()),
  writeAsStringAsync: jest.fn(() => Promise.resolve()),
  deleteAsync: jest.fn(() => Promise.resolve()),
  moveAsync: jest.fn(() => Promise.resolve()),
  copyAsync: jest.fn(() => Promise.resolve()),
  makeDirectoryAsync: jest.fn(() => Promise.resolve()),
  readDirectoryAsync: jest.fn(() => Promise.resolve()),
  createDownloadResumable: jest.fn(() => Promise.resolve()),
  documentDirectory: 'file:///test-directory/',
}))

jest.mock('expo-linking', () => ({
  parse: jest.fn(() => Promise.resolve({ path: 'path' })),
  useUrl: jest.fn(() => ({ openUrl: jest.fn() })),
}))

jest.mock('expo-secure-store', () => {
  return {
    NativeModulesProxy: {
      ExpoSecureStore: {
        setValueWithKeyAsync: jest.fn(),
        getValueWithKeyAsync: jest.fn(),
      },
    },
    SecureStore: {
      setItemAsync: jest.fn(),
      getItemAsync: jest.fn(),
    },
  }
})

jest.mock('expo-image', () => {
  return {
    __esModule: true,
    default: () => {
      return <></>
    },
    Image: () => {
      return <></>
    },
  }
})

jest.mock('expo-router', () => {
  return {
    __esModule: true,
    default: () => {
      return <></>
    },
    Link: ({ children }) => {
      return <>{children}</>
    },
  }
})

jest.mock('expo-auth-session', () => {
  return {
    __esModule: true,
    default: () => {
      return <></>
    },
    makeRedirectUri: jest.fn(),
    useAutoDiscovery: () => {
      return {
        discovery: {
          token_endpoint: 'https://auth.expo.io/oauth2/v1/token',
        },
      }
    },
  }
})

jest.mock('expo-web-browser', () => {
  return {
    __esModule: true,
    default: () => {
      return <></>
    },
    maybeCompleteAuthSession: jest.fn(),
  }
})
