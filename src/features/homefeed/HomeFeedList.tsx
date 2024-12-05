import { memo, useCallback, useRef } from 'react'
import { FlatList } from 'react-native'
import { AlertCard, FeedCard } from '@/components/Cards'
import { usePageLayoutScroll } from '@/components/layouts/PageLayout/usePageLayoutScroll'
import { transformFeedItemToProps } from '@/helpers/homeFeed'
import { useAlerts } from '@/services/alerts/hook'
import { useGetPaginatedFeed } from '@/services/timeline-feed/hook'
import { RestTimelineFeedItem } from '@/services/timeline-feed/schema'
import { useScrollToTop } from '@react-navigation/native'
import { getToken, Spinner, useMedia, YStack } from 'tamagui'
import { useDebouncedCallback } from 'use-debounce'
import NotificationSubscribeCard from './components/NotificationSubscribeCard'
import { useShouldShowNotificationCard } from './hooks/useShouldShowNotificationCard'

const FeedCardMemoized = memo(FeedCard) as typeof FeedCard

const TimelineFeedCard = memo((item: RestTimelineFeedItem) => {
  const props = transformFeedItemToProps(item)
  return <FeedCardMemoized {...props} />
})

const HomeFeedList = () => {
  const media = useMedia()
  const shouldShowNotificationCard = useShouldShowNotificationCard()
  const { data: paginatedFeed, fetchNextPage, hasNextPage, refetch, isRefetching } = useGetPaginatedFeed()
  const feedData = paginatedFeed?.pages.map((page) => page?.hits ?? []).flat()

  const loadMoreGeneric = () => {
    if (isRefetching) return
    if (hasNextPage) {
      fetchNextPage()
    }
  }
  const loadMore = useDebouncedCallback(loadMoreGeneric, 1000, { leading: true, trailing: false })

  const { isWebPageLayoutScrollActive } = usePageLayoutScroll({
    onEndReached: loadMore,
    onEndReachedThreshold: 0.75,
  })
  const loadMoreNative = () => {
    if (isWebPageLayoutScrollActive) return
    loadMore()
  }

  const flatListRef = useRef<FlatList<RestTimelineFeedItem>>(null)
  useScrollToTop(flatListRef)

  const { data: alerts } = useAlerts()
  const renderFeedItem = useCallback(({ item }: { item: RestTimelineFeedItem }) => {
    return <TimelineFeedCard {...item} />
  }, [])
  return (
    <FlatList
      ref={flatListRef}
      style={{ flex: 1 }}
      scrollEnabled={!isWebPageLayoutScrollActive}
      contentContainerStyle={{
        gap: getToken('$medium', 'space'),
        paddingTop: media.gtSm ? getToken('$medium', 'space') : undefined,
        paddingLeft: media.gtSm ? getToken('$medium', 'space') : undefined,
        paddingRight: media.gtSm ? getToken('$medium', 'space') : undefined,
        paddingBottom: getToken('$11', 'space'),
        justifyContent: 'space-around',
      }}
      ListHeaderComponent={
        alerts.length > 0 || shouldShowNotificationCard
          ? () => (
              <YStack gap={8} $gtSm={{ gap: 16 }}>
                {shouldShowNotificationCard ? <NotificationSubscribeCard /> : null}
                {alerts.map((alert, i) => (
                  <AlertCard key={`${i}-alert`} payload={alert} />
                ))}
              </YStack>
            )
          : undefined
      }
      data={feedData}
      renderItem={renderFeedItem}
      keyExtractor={(item) => item.objectID}
      refreshing={isRefetching}
      onRefresh={() => refetch()}
      onEndReached={loadMoreNative}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        hasNextPage ? (
          <YStack p="$medium" pb="$large">
            <Spinner size="large" />
          </YStack>
        ) : null
      }
    />
  )
}
export default HomeFeedList
