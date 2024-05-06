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
  CADRE_RENAISSANCE_HOST: z.string(),
})

export type ClientEnv = z.infer<typeof envClientSchema>

export default envClientSchema
