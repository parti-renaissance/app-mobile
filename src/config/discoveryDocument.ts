import { OAUTH_BASE_URL } from '@/config/env'
import type { DiscoveryDocument } from 'expo-auth-session'

export default {
  authorizationEndpoint: `${OAUTH_BASE_URL}/oauth/v2/auth`,
  tokenEndpoint: `${OAUTH_BASE_URL}/oauth/v2/token`,
  //   revocationEndpoint: `${OAUTH_BASE_URL}/oauth/v2/revoke`,
  //   registrationEndpoint: `${OAUTH_BASE_URL}/oauth/v2/register`,
  //   endSessionEndpoint: `${OAUTH_BASE_URL}/oauth/v2/logout`,
} as DiscoveryDocument
