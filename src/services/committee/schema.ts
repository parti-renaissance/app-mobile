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

export const RestSetMyCommitteeRequestSchema = z.void()
export type RestSetMyCommitteeRequest = z.infer<typeof RestSetMyCommitteeRequestSchema>

export type RestSetMyCommitteeResponse = z.infer<typeof RestSetMyCommitteeResponseSchema>
export const RestSetMyCommitteeResponseSchema = z.any()
