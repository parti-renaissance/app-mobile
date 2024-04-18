import type { DiscoveryDocument } from 'expo-auth-session'

const discoveryDocument = {
  authorizationEndpoint: `${process.env.EXPO_PUBLIC_OAUTH_BASE_URL}/oauth/v2/auth`,
  tokenEndpoint: `${process.env.EXPO_PUBLIC_OAUTH_BASE_URL}/oauth/v2/token`,
  registrationEndpoint: `${process.env.EXPO_PUBLIC_OAUTH_BASE_URL}/inscription?utm_source=app`,
} satisfies DiscoveryDocument

export default discoveryDocument
