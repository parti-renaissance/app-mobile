import { memo, useCallback, useRef } from 'react'
import { FlatList } from 'react-native'
import { AlertCard, FeedCard } from '@/components/Cards'
import { transformFeedItemToProps } from '@/helpers/homeFeed'
import { useAlerts } from '@/services/alerts/hook'
import { useGetProfil } from '@/services/profile/hook'
import { useGetPaginatedFeed } from '@/services/timeline-feed/hook'
import { RestTimelineFeedItem } from '@/services/timeline-feed/schema'
import { useScrollToTop } from '@react-navigation/native'
import { getToken, Spinner, useMedia, YStack } from 'tamagui'
import { useDebouncedCallback } from 'use-debounce'

const FeedCardMemoized = memo(FeedCard) as typeof FeedCard

const TimelineFeedCard = memo((item: RestTimelineFeedItem) => {
  const props = transformFeedItemToProps(item)
  return <FeedCardMemoized {...props} />
})

const HomeFeedList = () => {
  const media = useMedia()
  const user = useGetProfil()
  const { data: paginatedFeed, fetchNextPage, hasNextPage, refetch, isRefetching } = useGetPaginatedFeed(user.data?.postal_code)
  const feedData = paginatedFeed?.pages.map((page) => page?.hits ?? []).flat()
  const _loadMore = () => {
    if (isRefetching) return
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const loadMore = useDebouncedCallback(_loadMore, 1000, { leading: true, trailing: false })

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
      contentContainerStyle={{
        gap: getToken('$4', 'space'),
        paddingTop: media.gtSm ? getToken('$5', 'space') : getToken('$4', 'space'),
        paddingLeft: media.gtSm ? getToken('$5', 'space') : undefined,
        paddingRight: media.gtSm ? getToken('$5', 'space') : undefined,
      }}
      ListHeaderComponent={() => (
        <YStack flex={1}>
          {alerts.map((alert, i) => (
            <AlertCard key={`${i}-alert`} payload={alert} />
          ))}
        </YStack>
      )}
      data={feedData}
      renderItem={renderFeedItem}
      keyExtractor={(item) => item.objectID}
      refreshing={isRefetching}
      onRefresh={() => refetch()}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        hasNextPage ? (
          <YStack p="$3" pb="$6">
            <Spinner size="large" />
          </YStack>
        ) : null
      }
    />
  )
}
export default HomeFeedList
