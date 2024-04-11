import type { DiscoveryDocument } from 'expo-auth-session'

export default {
  authorizationEndpoint: `${process.env.EXPO_PUBLIC_OAUTH_BASE_URL}/oauth/v2/auth`,
  tokenEndpoint: `${process.env.EXPO_PUBLIC_OAUTH_BASE_URL}/oauth/v2/token`,
} as DiscoveryDocument
