export interface RestRetaliation {
  title: string
  body: string
  source_url: string
  with_notification: boolean
  uuid: string
  created_at: string
  open_graph: RestRetaliationOpenGraph | null
}

export interface RestRetaliationOpenGraph {
  url: string | null
  type: string | null
  image: string | null
  title: string | null
  site_name: string | null
  description: string | null
}
