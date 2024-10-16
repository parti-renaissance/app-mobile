import z from 'zod'

export type RestGetFormationsResponse = z.infer<typeof RestGetFormationsResponseSchema>
export const RestGetFormationsResponseSchema = z.array(
  z.object({
    title: z.string(),
    description: z.string(),
    content_type: z.enum(['link', 'file']),
    category: z.string().nullable(),
    uuid: z.string().uuid(),
    link: z.string().nullable(),
    file_path: z.string().nullable(),
    position: z.number(),
    visibility: z.enum(['local', 'national']),
  }),
)

export type RestGetFormationsRequest = z.infer<typeof RestGetFormationsRequestSchema>
export const RestGetFormationsRequestSchema = z.void()
