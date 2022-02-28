import { TimelineFeedItem } from '../../../../core/entities/TimelineFeedItem'
import { ErrorMonitor } from '../../../../utils/ErrorMonitor'

export const logWaringsIfNeeded = (
  item: TimelineFeedItem,
  keys: Array<keyof TimelineFeedItem>,
) => {
  keys.forEach((key) => {
    // eslint-disable-next-line security/detect-object-injection
    if (item[key] === undefined) {
      ErrorMonitor.log(
        `[TimelineFeed] Missing attribute ${key} for ${item.type} ${item.uuid}`,
      )
    }
  })
}
