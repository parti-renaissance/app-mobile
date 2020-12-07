import { RestMetadata } from './RestMetadata'

export interface RestNews {
  uuid: string
  title: string
  text: string
  created_at: string
  external_link: string | null
}

export interface RestNewsResponse {
  metadata: RestMetadata
  items: Array<RestNews>
}
