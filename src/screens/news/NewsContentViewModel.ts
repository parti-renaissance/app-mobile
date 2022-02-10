import { NewsRowViewModel } from './NewsRowViewModel'

export interface NewsContentSectionViewModel {
  title: string
  data: Array<NewsRowViewModel>
}

export interface NewsContentViewModel {
  sections: Array<NewsContentSectionViewModel>
}
