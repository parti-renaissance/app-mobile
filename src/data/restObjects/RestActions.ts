import * as z from 'zod'

export enum ActionType {
  PAP = 'pap',
  BOITAGE = 'boitage',
  TRACTAGE = 'tractage',
  COLLAGE = 'collage',
}

export enum ActionStatus {
  SCHEDULED = 'scheduled',
  CANCELLED = 'cancelled',
}

const ActionTypeSchema = z.nativeEnum(ActionType)
const ActionStatusSchema = z.nativeEnum(ActionStatus)
const ActionAuthor = z.object({
  uuid: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
})

const ActionAddressSchema = z.object({
  address: z.string(),
  postal_code: z.string(),
  city: z.string(),
  city_name: z.string(),
  country: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

const ActionParticipantSchema = z.object({
  is_present: z.boolean(),
  adherent: ActionAuthor,
  uuid: z.string().uuid(),
  created_at: z.string().date(),
  updated_at: z.string().date(),
})

const ActionSchema = z.object({
  type: ActionTypeSchema,
  date: z.string().date(),
  status: ActionStatusSchema,
  uuid: z.string().uuid(),
  post_address: ActionAddressSchema,
  created_at: z.string().date(),
  updated_at: z.string().date(),
  author: ActionAuthor,
  participants_count: z.number(),
  first_participants: z.array(ActionParticipantSchema),
})

const MetadataSchema = z.object({
  total_items: z.number(),
  items_per_page: z.number(),
  count: z.number(),
  current_page: z.number(),
  last_page: z.number(),
})

export const ActionPaginationSchema = z.object({
  metadata: MetadataSchema,
  items: z.array(ActionSchema),
})

export const ActionRequestParamsSchema = z.object({
  longitude: z.number(),
  latitude: z.number(),
  page: z.number(),
})

export type RestActionRequestParams = z.infer<typeof ActionRequestParamsSchema>

export type RestActionType = z.infer<typeof ActionTypeSchema>
export type RestActionStatus = z.infer<typeof ActionStatusSchema>
export type RestActionAuthor = z.infer<typeof ActionAuthor>
export type RestActionAddress = z.infer<typeof ActionAddressSchema>
export type RestActionParticipant = z.infer<typeof ActionParticipantSchema>
export type RestAction = z.infer<typeof ActionSchema>
export type RestActions = z.infer<typeof ActionPaginationSchema>
