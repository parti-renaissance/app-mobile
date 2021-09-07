import { RegionViewModel } from '../regions/RegionViewModel'

export interface PhoningSectionRowViewModel {
  sectionName?: string
}

export type PhoningSectionViewModel = {
  id: string
  sectionViewModel?: PhoningSectionRowViewModel
  data: Array<PhoningRowViewModel>
}

export type PhoningRowViewModel = {
  type: 'region'
  value: RegionViewModel
}
