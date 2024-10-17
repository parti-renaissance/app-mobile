import * as schemas from '@/services/committee/schema'
import { api } from '@/utils/api'

export const getCommittees = api({
  method: 'GET',
  path: '/api/v3/profile/committees',
  requestSchema: schemas.RestGetComitteesRequestSchema,
  responseSchema: schemas.RestGetComitteesResponseSchema,
  type: 'private',
})
