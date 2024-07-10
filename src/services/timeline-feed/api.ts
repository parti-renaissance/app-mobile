import * as schemas from '@/services/timeline-feed/schema'
import { api } from '@/utils/api'
import { z } from 'zod'

export const getTimelineFeed = api<z.infer<typeof schemas.RestTimelineFeedRequestSchema>, z.infer<typeof schemas.RestTimelineFeedResponseSchema>>({
  method: 'GET',
  path: 'api/v3/je-mengage/timeline_feeds',
  requestSchema: schemas.RestTimelineFeedRequestSchema,
  responseSchema: schemas.RestTimelineFeedResponseSchema,
  type: 'private',
})
