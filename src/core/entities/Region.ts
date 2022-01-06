import { Campaign } from './Campaign'

export interface Region {
  id: string
  name: string
  code: string
  campaign: Campaign | null
}
