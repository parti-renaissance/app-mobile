export interface RestRetaliation {
  uuid: string
  title: string
  text: string
  created_at: string
  external_link: string | null
}

export interface RestRetaliationsResponse {
  items: Array<RestRetaliation>
}
