import { RestMetadata } from './RestMetadata'

export interface RestNews {
  uuid: string
  title: string
  text: string
  created_at: string
  external_link: string | null
  pinned: boolean
  enriched: boolean
  visibility: 'national' | 'local'
  creator: string | null
}

export interface RestNewsResponse {
  metadata: RestMetadata
  items: Array<RestNews>
}
