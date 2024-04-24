import { z } from 'zod'

const envClientSchema = z.object({
  ANDROID_GOOGLE_API_KEY: z.string(),
  API_BASE_URL: z.string().url(),
  APP_RENAISSANCE_HOST: z.string(),
  ASSOCIATED_DOMAIN: z.string(),
  ENVIRONMENT: z.enum(['staging', 'production']),
  FB_API_KEY: z.string(),
  FB_APP_ID: z.string(),
  FB_MEASUREMENT_ID: z.string(),
  FB_PROJECT_ID: z.string(),
  FB_SENDER_ID: z.string(),
  IOS_GOOGLE_API_KEY: z.string(),
  OAUTH_BASE_URL: z.string().url(),
  OAUTH_CLIENT_ID: z.string(),
  SENTRY_DSN: z.string().url(),
})

const unParsedClientEnv = {
  ANDROID_GOOGLE_API_KEY: process.env.EXPO_PUBLIC_ANDROID_GOOGLE_API_KEY,
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
  APP_RENAISSANCE_HOST: process.env.EXPO_PUBLIC_APP_RENAISSANCE_HOST,
  ASSOCIATED_DOMAIN: process.env.EXPO_PUBLIC_ASSOCIATED_DOMAIN,
  ENVIRONMENT: process.env.EXPO_PUBLIC_ENVIRONMENT,
  FB_API_KEY: process.env.EXPO_PUBLIC_FB_API_KEY,
  FB_APP_ID: process.env.EXPO_PUBLIC_FB_APP_ID,
  FB_MEASUREMENT_ID: process.env.EXPO_PUBLIC_FB_MEASUREMENT_ID,
  FB_PROJECT_ID: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
  FB_SENDER_ID: process.env.EXPO_PUBLIC_FB_SENDER_ID,
  IOS_GOOGLE_API_KEY: process.env.EXPO_PUBLIC_IOS_GOOGLE_API_KEY,
  OAUTH_BASE_URL: process.env.EXPO_PUBLIC_OAUTH_BASE_URL,
  OAUTH_CLIENT_ID: process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID,
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
}

export default envClientSchema.parse(unParsedClientEnv)
