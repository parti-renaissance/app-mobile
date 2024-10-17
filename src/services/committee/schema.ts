import z from 'zod'

export type RestGetComitteesResponse = z.infer<typeof RestGetComitteesResponseSchema>
export const RestGetComitteesResponseSchema = z.array(
  z.object({
    members_count: z.number(),
    description: z.string(),
    uuid: z.string().uuid(),
    name: z.string(),
  }),
)

export type RestGetComitteesRequest = z.infer<typeof RestGetComitteesRequestSchema>
export const RestGetComitteesRequestSchema = z.void()
