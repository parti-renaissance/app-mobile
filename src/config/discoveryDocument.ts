import type { DiscoveryDocument } from 'expo-auth-session'

export default {
  authorizationEndpoint: `${process.env.OAUTH_BASE_URL}/oauth/v2/auth`,
  tokenEndpoint: `${process.env.OAUTH_BASE_URL}/oauth/v2/token`,
} as DiscoveryDocument
