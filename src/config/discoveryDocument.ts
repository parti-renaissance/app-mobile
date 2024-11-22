import clientEnv from '@/config/clientEnv'
import type { DiscoveryDocument } from 'expo-auth-session'

const discoveryDocument = {
  authorizationEndpoint: `${clientEnv.OAUTH_BASE_URL}/oauth/v2/auth`,
  tokenEndpoint: `${clientEnv.OAUTH_BASE_URL}/oauth/v2/token`,
  registrationEndpoint: `${clientEnv.OAUTH_BASE_URL}/adhesion`,
  endSessionEndpoint: `${clientEnv.OAUTH_BASE_URL}/deconnexion`,
} satisfies DiscoveryDocument

export default discoveryDocument
