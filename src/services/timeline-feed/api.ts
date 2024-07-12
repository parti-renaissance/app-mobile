import * as schemas from '@/services/timeline-feed/schema'
import type * as Types from '@/services/timeline-feed/schema'
import { api } from '@/utils/api'

export const getTimelineFeed = api<Types.RestTimelineFeedRequest, Types.RestTimelineFeedResponse>({
  method: 'GET',
  path: 'api/v3/je-mengage/timeline_feeds',
  requestSchema: schemas.RestTimelineFeedRequestSchema,
  responseSchema: schemas.RestTimelineFeedResponseSchema,
  type: 'private',
})
