import { NewsRowViewModel } from './NewsRowViewModel'

export interface NewsContentSectionViewModel {
  title?: string
  data: Array<NewsRowViewModel>
  isHighlighted: boolean
}

export interface NewsContentViewModel {
  sections: Array<NewsContentSectionViewModel>
}
