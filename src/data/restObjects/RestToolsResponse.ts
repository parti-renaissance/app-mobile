import { RestMetadata } from './RestMetadata'

export interface RestTool {
  image_url: string
  label: string
  url: string
  uuid: string
}

export interface RestToolsResponse {
  metadata: RestMetadata
  items: Array<RestTool>
}
