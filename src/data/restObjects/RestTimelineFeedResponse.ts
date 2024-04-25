export interface RestTimelineFeedAddress {
  address: string
  postal_code: string
  city_name: string
  country: string
}

export interface RestTimelineFeedItem {
  objectID: string
  type: 'news' | 'event' | 'phoning-campaign' | 'pap-campaign' | 'survey' | 'riposte'
  title: string
  description: string
  author: string | null
  date: string
  begin_at: string | null
  finish_at: string | null
  image: string | null
  address: string | null
  category: string | null
  is_local: boolean | null
  media_type: string | null
  cta_link: string | null
  cta_label: string | null
  url: string | null
  time_zone: string | null
  mode: 'meeting' | 'online' | null
  post_address?: RestTimelineFeedAddress
}

export interface RestTimelineFeedResponse {
  hits: Array<RestTimelineFeedItem>
  page: number
  nbHits: number
  nbPages: number
  hitsPerPage: number
  params: string
}
