import { Tool } from '../../core/entities/Tool'
import { HomeToolRowViewModel } from './HomeToolRowViewModel'

export const HomeToolRowViewModelMapper = {
  map: (tool: Tool): HomeToolRowViewModel => {
    return {
      id: tool.id,
      title: tool.title,
      url: tool.url,
    }
  },
}
