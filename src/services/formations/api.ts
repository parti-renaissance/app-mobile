import * as schemas from '@/services/formations/schema'
import { api } from '@/utils/api'

export const getFormations = api({
  method: 'GET',
  path: '/api/v3/formations?pagination=false',
  requestSchema: schemas.RestGetFormationsRequestSchema,
  responseSchema: schemas.RestGetFormationsResponseSchema,
  type: 'private',
})
