import { RetaliationSiteType } from './Retaliation'

export interface TimelineFeedBase {
  uuid: string
  title: string
  description: string
  date: Date
}

export interface TimelineFeedItemNews extends TimelineFeedBase {
  author?: string
  isLocal: boolean
}

export interface TimelineFeedItemEvent extends TimelineFeedBase {
  imageUri?: string
  beginAt: Date
  finishAt: Date
  address?: string
  category?: string
}

export interface TimelineFeedItemRetaliation extends TimelineFeedBase {
  mediaType: RetaliationSiteType
  url: string
}

export interface TimelineFeedItemActionCampaign extends TimelineFeedBase {
  imageUri?: string
}

export type TimelineFeedItem =
  | { type: 'news'; value: TimelineFeedItemNews }
  | { type: 'event'; value: TimelineFeedItemEvent }
  | { type: 'retaliation'; value: TimelineFeedItemRetaliation }
  | { type: 'survey'; value: TimelineFeedItemActionCampaign }
  | { type: 'phoning'; value: TimelineFeedItemActionCampaign }
  | { type: 'doorToDoor'; value: TimelineFeedItemActionCampaign }
