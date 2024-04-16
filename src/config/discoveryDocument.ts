import type { DiscoveryDocument } from 'expo-auth-session';


const discoveryDocument = {
  authorizationEndpoint: `${process.env.EXPO_PUBLIC_OAUTH_BASE_URL}/oauth/v2/auth`,
  tokenEndpoint: `${process.env.EXPO_PUBLIC_OAUTH_BASE_URL}/oauth/v2/token`,
} as DiscoveryDocument

    console.log(discoveryDocument)
    console.log(process.env.EXPO_PUBLIC_API_BASE_URL)


export default discoveryDocument
