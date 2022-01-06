import { Tool } from '../../core/entities/Tool'
import { ToolRowViewModel } from './ToolRowViewModel'

export const ToolRowViewModelMapper = {
  map: (tools: Array<Tool>): Array<ToolRowViewModel> => {
    return tools.map((tool) => {
      return {
        id: tool.id,
        title: tool.title,
      }
    })
  },
}
