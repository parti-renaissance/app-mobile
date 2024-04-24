import { z } from 'zod'

const envClientSchema = z.object({
  API_BASE_URL: z.string().url(),
  ASSOCIATED_DOMAIN: z.string().url(),
  SENTRY_DSN: z.string().url(),
  OAUTH_BASE_URL: z.string().url(),
  IOS_GOOGLE_API_KEY: z.string(),
  ANDROID_GOOGLE_API_KEY: z.string(),
  OAUTH_CLIENT_ID: z.string(),
  FB_API_KEY: z.string(),
  FB_PROJECT_ID: z.string(),
  FB_SENDER_ID: z.string(),
  FB_APP_ID: z.string(),
  FB_MEASUREMENT_ID: z.string(),
  ENVIRONMENT: z.enum(['staging', 'production']),
})

const unParsedClientEnv = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
  IOS_GOOGLE_API_KEY: process.env.EXPO_PUBLIC_IOS_GOOGLE_API_KEY,
  ANDROID_GOOGLE_API_KEY: process.env.EXPO_PUBLIC_ANDROID_GOOGLE_API_KEY,
  ASSOCIATED_DOMAIN: process.env.EXPO_PUBLIC_ASSOCIATED_DOMAIN,
  OAUTH_CLIENT_ID: process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID,
  OAUTH_BASE_URL: process.env.EXPO_PUBLIC_OAUTH_BASE_URL,
  FB_API_KEY: process.env.EXPO_PUBLIC_FB_API_KEY,
  FB_PROJECT_ID: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
  FB_SENDER_ID: process.env.EXPO_PUBLIC_FB_SENDER_ID,
  FB_APP_ID: process.env.EXPO_PUBLIC_FB_APP_ID,
  FB_MEASUREMENT_ID: process.env.EXPO_PUBLIC_FB_MEASUREMENT_ID,
  ENVIRONMENT: process.env.EXPO_PUBLIC_ENVIRONMENT,
}

export default envClientSchema.parse(unParsedEnvClient)
