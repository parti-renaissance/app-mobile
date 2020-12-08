import { Campaign } from './Campaign'
import RegionTheme from './RegionTheme'

export interface Region {
  id: string
  name: string
  code: string
  theme: RegionTheme
  campaign: Campaign | null
}
