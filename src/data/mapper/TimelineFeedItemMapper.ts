import { TimelineFeedItem } from '../../core/entities/TimelineFeedItem'
import { RestTimelineFeedItem } from '../restObjects/RestTimelineFeedResponse'

const mapNullToUndefined = <T, U>(
  input: T | null,
  transform: (input: T) => U,
): U | undefined => {
  return input === null ? undefined : transform(input)
}

const id = <T>(input: T): T => input
const dateParser = (input: string): Date => new Date(input)

export const TimelineFeedItemMapper = {
  map: (restItem: RestTimelineFeedItem): TimelineFeedItem => {
    return {
      uuid: restItem.objectID,
      type: restItem.type,
      title: restItem.title,
      description: mapNullToUndefined(restItem.description, id),
      author: mapNullToUndefined(restItem.author, id),
      date: dateParser(restItem.date),
      beginAt: mapNullToUndefined(restItem.begin_at, dateParser),
      finishAt: mapNullToUndefined(restItem.finish_at, dateParser),
      imageUri: mapNullToUndefined(restItem.image, id),
      address: mapNullToUndefined(restItem.address, id),
      category: mapNullToUndefined(restItem.category, id),
      isLocal: restItem.is_local ?? false,
    }
  },
}
