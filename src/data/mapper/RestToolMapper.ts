import { Tool } from '../../core/entities/Tool'
import { RestTool } from '../restObjects/RestToolsResponse'

export const RestToolMapper = {
  map: (restTool: RestTool): Tool => {
    return {
      id: restTool.uuid,
      title: restTool.label,
      url: restTool.url,
    }
  },
}
