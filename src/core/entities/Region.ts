import RegionTheme from './RegionTheme'

export interface Region {
  id: string
  name: string
  code: string
  subtitle: string
  description: string
  theme: RegionTheme
  externalLink: string | null
  slug: string
  logo: string
  banner: string | null
}
