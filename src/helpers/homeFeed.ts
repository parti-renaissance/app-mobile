import { Linking } from 'react-native'
import { type FeedCardProps } from '@/components/Cards'
import { logDefaultError } from '@/data/network/NetworkLogger'
import { RestTimelineFeedItem } from '@/data/restObjects/RestTimelineFeedResponse'
import { router } from 'expo-router'

const tramformFeedItemType = (type: RestTimelineFeedItem['type']): FeedCardProps['type'] => {
  switch (type) {
    case 'news':
      return 'news'
    case 'event':
      return 'event'
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
    role: 'Role data missing',
    name: feed.author ?? '',
    title: 'title data missing',
    pictureLink: undefined,
  }
  const location = feed.post_address
    ? {
        city: feed.post_address.city_name,
        postalCode: feed.post_address.postal_code,
        street: feed.post_address.address,
      }
    : undefined
  const tag = tramformFeedItemTypeToTag(feed.type)
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
          isSubscribed: undefined,
          date: {
            start: feed.begin_at ? new Date(feed.begin_at) : new Date(feed.date),
            end: feed.finish_at ? new Date(feed.finish_at) : new Date(feed.date),
            timeZone: feed.time_zone,
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
            case 'riposte':
              router.push({
                pathname: '/(tabs)/actions/retaliation/[id]',
                params: { id: feed.objectID },
              })
              break
            case 'phoning-campaign':
              router.navigate({
                pathname: '/actions/phoning/',
                params: { id: feed.objectID },
              })
              break
            case 'pap-campaign':
              router.navigate({
                pathname: '/(tabs)/porte-a-porte',
                params: { id: feed.objectID },
              })
              break
            case 'survey':
              router.push({
                pathname: '/poll-detail',
                params: { id: feed.objectID },
              })
              break
          }
        },
        payload: {
          tag,
          isSubscribed: false,
          date: {
            start: feed.begin_at ? new Date(feed.begin_at) : new Date(feed.date),
            end: feed.finish_at ? new Date(feed.finish_at) : new Date(feed.date),
          },
          location,
          author,
          attendees: {
            pictures: ['https://picsum.photos/id/64/200/200', 'https://picsum.photos/id/66/200/200', 'https://picsum.photos/id/71/200/200'],
            count: 40,
          },
        },
      }
  }
}
