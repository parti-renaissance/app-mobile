import * as schemas from '@/services/formations/schema'
import { api } from '@/utils/api'
import z from 'zod'

export const getFormations = api({
  method: 'GET',
  path: '/api/v3/formations?pagination=false',
  requestSchema: schemas.RestGetFormationsRequestSchema,
  responseSchema: schemas.RestGetFormationsResponseSchema,
  type: 'private',
})

export const getFormationLink = (uuid: string) =>
  api({
    method: 'GET',
    path: `/api/v3/formations/${uuid}/link`,
    requestSchema: z.void(),
    responseSchema: z.object({
      link: z.string(),
    }),
    type: 'private',
  })()
