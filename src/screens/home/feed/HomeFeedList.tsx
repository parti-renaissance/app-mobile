import { memo } from 'react'
import { FlatList } from 'react-native'
import { FeedCard } from '@/components/Cards'
import { RestTimelineFeedItem } from '@/data/restObjects/RestTimelineFeedResponse'
import { tranformFeedItemToProps } from '@/helpers/homeFeed'
import { useGetPaginatedFeed } from '@/hooks/useFeed'
import { useGetProfilObserver } from '@/hooks/useProfil'
import { getToken, Spinner, useMedia, YStack } from 'tamagui'

const TimelineFeedCard = memo((item: RestTimelineFeedItem) => {
  const props = tranformFeedItemToProps(item)
  return <FeedCard {...props} $sm={{ width: '100%' }} $gtSm={{ width: 500 }} />
})

const renderFeedItem = ({ item }: { item: RestTimelineFeedItem }) => {
  return <TimelineFeedCard {...item} />
}

const HomeFeedList = () => {
  const { data: profile } = useGetProfilObserver()
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
      style={{ width: '100%' }}
      contentContainerStyle={{ paddingTop: getToken('$space.6'), gap: getToken('$space.3'), flexGrow: 1, alignItems: media.gtSm ? 'center' : undefined }}
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
