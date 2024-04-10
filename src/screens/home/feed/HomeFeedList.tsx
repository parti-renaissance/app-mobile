import { memo } from 'react'
import { FlatList } from 'react-native'
import { FeedCard } from '@/components/Cards'
import { RestTimelineFeedItem } from '@/data/restObjects/RestTimelineFeedResponse'
import { tranformFeedItemToProps } from '@/helpers/homeFeed'
import { useGetPaginatedFeed } from '@/hooks/useFeed'
import { useGetProfil } from '@/hooks/useProfil'
import { getToken, Spinner, useMedia, YStack } from 'tamagui'

const TimelineFeedCard = memo((item: RestTimelineFeedItem) => {
  const props = tranformFeedItemToProps(item)
  return <FeedCard {...props} />
})

const renderFeedItem = ({ item }: { item: RestTimelineFeedItem }) => {
  return <TimelineFeedCard {...item} />
}

const HomeFeedList = () => {
  const { data: profile } = useGetProfil()
  const media = useMedia()

  const { data: paginatedFeed, fetchNextPage, hasNextPage, refetch, isRefetching } = useGetPaginatedFeed(profile?.postal_code)

  const feedData = paginatedFeed?.pages.map((page) => page.hits).flat()

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{
        gap: getToken('$4', 'space'),
        paddingTop: media.gtSm ? getToken('$7', 'space') : getToken('$4', 'space'),
        paddingLeft: media.gtSm ? getToken('$7', 'space') : undefined,
        paddingRight: media.gtSm ? getToken('$7', 'space') : undefined,
      }}
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
