import { News } from '../../core/entities/News'
import { RestNews } from '../restObjects/RestNewsResponse'

export const RestNewsMapper = {
  map: (restNews: RestNews): News => {
    const urlSize = restNews.external_link?.length ?? 0
    return {
      id: restNews.uuid,
      title: restNews.title,
      description: restNews.text,
      date: new Date(restNews.created_at),
      url: urlSize > 0 ? restNews.external_link! : undefined,
      isPinned: restNews.pinned,
      isMarkdown: restNews.enriched,
      visibility: restNews.visibility,
      creator: restNews.creator !== null ? restNews.creator : undefined,
    }
  },
}
