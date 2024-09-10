import { api } from '@/utils/api'
import type { RestGetMagicLinkResponse, Slugs } from './schema'
import * as schema from './schema'

export const getMagicLink = async ({ slug }: { slug: Slugs }): Promise<RestGetMagicLinkResponse> => {
  return api({
    method: 'get',
    path: `/api/v3/app-link/${slug}`,
    requestSchema: schema.RestGetMagicLinkRequestSchema,
    responseSchema: schema.RestGetMagicLinkResponseSchema,
    type: 'private',
  })()
}

export const getLink = async ({ slug }: { slug: Slugs }): Promise<RestGetMagicLinkResponse> => {
  return api({
    method: 'get',
    path: `/api/app-link/${slug}`,
    requestSchema: schema.RestGetMagicLinkRequestSchema,
    responseSchema: schema.RestGetMagicLinkResponseSchema,
    type: 'public',
  })()
}
