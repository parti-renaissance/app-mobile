import { z } from 'zod'

export const RestAlertsResponseSchema = z.array(
  z.object({
    label: z.string(),
    title: z.string(),
    description: z.string(),
    cta_label: z.string(),
    cta_url: z.string(),
  }),
)

export const RestAlertsRequestSchema = z.void()
