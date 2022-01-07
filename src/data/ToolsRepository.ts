import { Tool } from '../core/entities/Tool'
import i18n from '../utils/i18n'

class ToolsRepository {
  private static instance: ToolsRepository
  private constructor() {}

  private tools: Array<Tool> = [
    {
      id: 2,
      title: i18n.t('tools.reforms.title'),
      url: i18n.t('tools.reforms.url'),
    },
    {
      id: 1,
      title: i18n.t('tools.near.title'),
      url: i18n.t('tools.near.url'),
    },
    {
      id: 4,
      title: i18n.t('tools.anothermandate.title'),
      url: i18n.t('tools.anothermandate.url'),
    },
  ]

  public getTools(): Promise<Array<Tool>> {
    return new Promise((resolve) => {
      resolve(this.tools)
    })
  }

  public static getInstance(): ToolsRepository {
    if (!ToolsRepository.instance) {
      ToolsRepository.instance = new ToolsRepository()
    }
    return ToolsRepository.instance
  }
}

export default ToolsRepository
