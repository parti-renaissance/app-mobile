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
import { getToken, ScrollView, Stack, Text, useMedia, YStack } from 'tamagui'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'

const TimelineFeedCard = memo((item: RestTimelineFeedItem) => {
  const props = tranformFeedItemToProps(item)
  return <FeedCard {...props} />
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
    initialPageParam: 1,
  })

  const feedData = paginatedFeed?.pages.map((page) => page.hits).flat()

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <PageLayout sidebar={<Text>Test</Text>}>
      <Stack $gtSm={{ flexDirection: 'row', height: '100%', gap: 8, overflow: 'scroll' }} height={'100vh'}>
        {media.gtSm && (
          <YStack flex={2} gap={2} mt="$3">
            <EuCampaignIllustration />
          </YStack>
        )}
        <Stack $gtSm={{ flex: 6 }} gap={2} alignContent="center" height={'100'} alignItems="center" overflow="scroll">
          <FlatList
            style={{ paddingTop: getToken('$space.3'), maxWidth: 440 }}
            ListHeaderComponent={
              !media.gtSm ? (
                <YStack flex={2} gap={2} p="$3">
                  <EuCampaignIllustration />
                </YStack>
              ) : null
            }
            contentContainerStyle={{ gap: getToken('$space.3') }}
            data={feedData}
            scrollEnabled={!media.gtSm}
            renderItem={renderFeedItem}
            keyExtractor={(item) => item.objectID}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
          />
        </Stack>
      </Stack>
    </PageLayout>
  )
}
export default HomeFeedList
