import {
  Retaliation,
  RetaliationOpenGraph,
} from './../../core/entities/Retaliation'
import {
  RestRetaliation,
  RestRetaliationOpenGraph,
} from '../restObjects/RestRetaliation'

export const RestRetaliationMapper = {
  map: (restRetaliation: RestRetaliation): Retaliation => {
    return {
      id: restRetaliation.uuid,
      title: restRetaliation.title,
      body: restRetaliation.body,
      sourceUrl: restRetaliation.source_url,
      createdAt: new Date(restRetaliation.created_at),
      withNotification: restRetaliation.with_notification,
      openGraph: RestRetaliationOpenGraphMapper.map(restRetaliation.open_graph),
    }
  },
}

const RestRetaliationOpenGraphMapper = {
  map: (
    restRetaliationOpenGraph: RestRetaliationOpenGraph | null,
  ): RetaliationOpenGraph | null => {
    if (restRetaliationOpenGraph === null) {
      return null
    }
    return {
      url: restRetaliationOpenGraph.url,
      type: restRetaliationOpenGraph.type,
      image: restRetaliationOpenGraph.image,
      title: restRetaliationOpenGraph.title,
      siteName: restRetaliationOpenGraph.title,
      description: restRetaliationOpenGraph.description,
    }
  },
}
