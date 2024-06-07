import { Linking } from 'react-native'
import { type FeedCardProps } from '@/components/Cards'
import { ActionType } from '@/core/entities/Action'
import { logDefaultError } from '@/data/network/NetworkLogger'
import { ReadableActionType } from '@/data/restObjects/RestActions'
import { RestTimelineFeedItem } from '@/data/restObjects/RestTimelineFeedResponse'
import { router } from 'expo-router'

const tramformFeedItemType = (type: RestTimelineFeedItem['type']): FeedCardProps['type'] => {
  switch (type) {
    case 'news':
      return 'news'
    case 'event':
      return 'event'
    case 'action':
    case 'riposte':
    case 'phoning-campaign':
    case 'pap-campaign':
    case 'survey':
      return 'action'
  }
}

const tramformFeedItemTypeToTag = (type: RestTimelineFeedItem['type']) => {
  switch (type) {
    case 'news':
      return 'Notification'
    case 'event':
      return 'Événement'
    case 'riposte':
      return 'Riposte'
    case 'phoning-campaign':
      return 'Campagne de phoning'
    case 'pap-campaign':
      return 'Campagne PAP'
    case 'survey':
      return 'Enquête'
  }
}

export const tranformFeedItemToProps = (feed: RestTimelineFeedItem): FeedCardProps => {
  const type = tramformFeedItemType(feed.type)
  const author = {
    role: feed.author?.role,
    name: feed.author?.first_name && feed.author?.last_name ? `${feed.author.first_name} ${feed.author.last_name}` : 'Author data missing',
    title: feed.author?.instance,
    pictureLink: undefined,
  }
  const location = feed.post_address
    ? {
        city: feed.post_address.city_name,
        postalCode: feed.post_address.postal_code,
        street: feed.post_address.address,
      }
    : undefined
  const tag = tramformFeedItemTypeToTag(feed.type)!
  switch (type) {
    case 'news':
      return {
        type,
        onShare: () => {},
        onShow: async () => {
          if (feed.cta_link && (await Linking.canOpenURL(feed.cta_link))) {
            await Linking.openURL(feed.cta_link).catch(logDefaultError)
          } else {
            router.push({
              pathname: '/news-detail',
              params: { id: feed.objectID },
            })
          }
        },
        payload: {
          title: feed.title,
          tag,
          image: feed.image ?? undefined,
          description: feed.description,
          location,
          ctaLabel: feed.cta_label,
          ctaLink: feed.cta_link,
          author,
          date: {
            start: new Date(feed.date),
            end: new Date(feed.date),
          },
        },
      }
    case 'event':
      return {
        type,
        onSubscribe: () => {},
        onShow: () => {
          router.push({
            pathname: '/event-detail',
            params: { id: feed.objectID },
          })
        },
        payload: {
          id: feed.objectID,
          title: feed.title,
          tag,
          image: feed.image ?? undefined,
          isSubscribed: !!feed.user_registered_at,
          date: {
            start: feed.begin_at ? new Date(feed.begin_at) : new Date(feed.date),
            end: feed.finish_at ? new Date(feed.finish_at) : new Date(feed.date),
            timeZone: feed.time_zone ?? undefined,
          },
          location: feed.mode === 'online' ? undefined : location,
          isOnline: feed.mode === 'online',
          author,
        },
      }
    case 'action':
      return {
        type,
        onSubscribe: () => {},
        onShow: () => {
          switch (feed.type) {
            case 'action':
              router.push({
                pathname: '/(tabs)/actions',
                params: { id: feed.objectID },
              })
              break
            default:
              break
          }
        },
        payload: {
          tag: ReadableActionType[feed.category?.toLowerCase() as ActionType],
          id: feed.objectID,
          isSubscribed: !!feed.user_registered_at,
          date: {
            start: feed.begin_at ? new Date(feed.begin_at) : new Date(feed.date),
            end: feed.finish_at ? new Date(feed.finish_at) : new Date(feed.date),
          },
          location,
          author,
          // attendees: {
          //   pictures: ['https://picsum.photos/id/64/200/200', 'https://picsum.photos/id/66/200/200', 'https://picsum.photos/id/71/200/200'],
          //   count: 40,
          // },
        },
      }
  }
}
