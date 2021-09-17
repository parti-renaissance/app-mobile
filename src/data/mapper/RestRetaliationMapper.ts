import { Retaliation } from './../../core/entities/Retaliation'
import { RestRetaliation } from './../restObjects/RestRetaliationsResponse'

export const RestRetaliationMapper = {
  map: (restRetaliation: RestRetaliation): Retaliation => {
    return {
      id: restRetaliation.uuid,
      title: restRetaliation.title,
      source_url: restRetaliation.source_url,
      createdAt: new Date(restRetaliation.created_at),
      withNotification: restRetaliation.with_notification,
    }
  },
}
