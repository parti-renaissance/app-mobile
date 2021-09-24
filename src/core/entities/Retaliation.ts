export interface Retaliation {
  title: string
  body: string
  sourceUrl: string
  withNotification: boolean
  id: string
  createdAt: Date
  openGraph: RetaliationOpenGraph | null
}

export interface RetaliationOpenGraph {
  url: string | null
  type: string | null
  image: string | null
  title: string | null
  site: RetaliationSiteType
  description: string | null
}

export type RetaliationSiteType = 'twitter' | 'facebook' | 'others'
