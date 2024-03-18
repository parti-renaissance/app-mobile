// first fetch profile,
import { memo } from 'react'
import { FlatList } from 'react-native'
import EuCampaignIllustration from '@/assets/illustrations/EuCampaignNineJune'
import { FeedCard } from '@/components/Cards'
import ApiService from '@/data/network/ApiService'
import { RestTimelineFeedItem, RestTimelineFeedResponse } from '@/data/restObjects/RestTimelineFeedResponse'
import { tranformFeedItemToProps } from '@/helpers/homeFeed'
import { useGetProfilObserver } from '@/hooks/useProfil'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { getToken, useMedia, YStack } from 'tamagui'

const TimelineFeedCard = memo((item: RestTimelineFeedItem) => {
  const props = tranformFeedItemToProps(item)
  return <FeedCard {...props} $sm={{ width: '100%' }} $gtSm={{ width: 500 }} />
})

const renderFeedItem = ({ item }: { item: RestTimelineFeedItem }) => {
  return <TimelineFeedCard {...item} />
}

const fetchTimelineFeed = async (pageParam: number, zipcode?: string) =>
  zipcode ? await ApiService.getInstance().getTimelineFeed(pageParam, zipcode) : (Promise.resolve(undefined) as Promise<RestTimelineFeedResponse | undefined>)

const HomeFeedList = () => {
  const { data: profile } = useGetProfilObserver()
  const media = useMedia()

  const {
    data: paginatedFeed,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam }) => fetchTimelineFeed(pageParam, profile?.postal_code),
    getNextPageParam: (lastPage) => (lastPage.nbPages > lastPage.page ? lastPage.page + 1 : null),
    getPreviousPageParam: (firstPage) => firstPage.page - 1,
    initialPageParam: 0,
  })

  const feedData = paginatedFeed?.pages.map((page) => page.hits).flat()

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <FlatList
      style={{ paddingTop: getToken('$space.3'), width: '100%' }}
      ListHeaderComponent={
        !media.gtSm ? (
          <YStack flex={2} gap={2} p="$3">
            <EuCampaignIllustration />
          </YStack>
        ) : null
      }
      contentContainerStyle={{ gap: getToken('$space.3'), flexGrow: 1, alignItems: media.gtSm ? 'center' : undefined }}
      data={feedData}
      renderItem={renderFeedItem}
      keyExtractor={(item) => item.objectID}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  )
}
export default HomeFeedList
