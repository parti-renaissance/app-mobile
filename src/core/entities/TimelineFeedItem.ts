export type TimelineFeedItemType =
  | 'news'
  | 'event'
  | 'phoning-campaign'
  | 'pap-campaign'
  | 'survey'
  | 'riposte'

export interface TimelineFeedItem {
  uuid: string
  type: TimelineFeedItemType
  title: string
  date: Date
  description?: string
  author?: string
  beginAt?: Date
  finishAt?: Date
  imageUri?: string
  address?: string
  category?: string
  isLocal: boolean
}
