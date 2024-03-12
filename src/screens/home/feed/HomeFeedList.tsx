// first fetch profile,
import { memo } from 'react'
import { FlatList } from 'react-native'
import EuCampaignIllustration from '@/assets/illustrations/EuCampaignNineJune'
import { FeedCard } from '@/components/Cards'
import ApiService from '@/data/network/ApiService'
import { RestTimelineFeedItem, RestTimelineFeedResponse } from '@/data/restObjects/RestTimelineFeedResponse'
import { tranformFeedItemToProps } from '@/helpers/homeFeed'
import { useGetProfilObserver } from '@/hooks/useProfil'
import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { getToken, ScrollView, Stack, Text, useTheme, XStack, YStack } from 'tamagui'

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
    <YStack flex={1} backgroundColor={'white'} overflow="hidden">
      <Stack flex={12} padding={2} margin={'$4'} gap={2}>
        <Stack flexDirection="row" flex={1} gap={'$8'}>
          <Stack flex={4} borderColor={'$gray3'} borderWidth={1}>
            <Text>Profil wip</Text>
          </Stack>

          <Stack flex={8} borderColor={'$gray3'} borderWidth={1} backgroundColor={'$gray2'} padding={'$4'} height={'100%'}>
            <Stack flexDirection="row" gap={8} height={'100%'}>
              <Stack flex={2} gap={2} mt="$3" ml="$3">
                <EuCampaignIllustration />
              </Stack>

              <Stack flex={6} gap={2} justifyContent="space-between" alignContent="center" alignItems="center" height={'100%'} overflow="scroll">
                <ScrollView
                  bg="$gray2"
                  contentContainerStyle={{ gap: getToken('$space.3') }}
                  style={{ paddingTop: getToken('$space.3') }}
                  scrollIndicatorInsets={{ right: 1 }}
                  maxWidth={600}
                  overflow="scroll"
                >
                  <FlatList
                    style={{ paddingTop: getToken('$space.3') }}
                    contentContainerStyle={{ gap: getToken('$space.3') }}
                    scrollEnabled={false}
                    data={feedData}
                    renderItem={renderFeedItem}
                    keyExtractor={(item) => item.objectID}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                  />
                </ScrollView>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </YStack>
  )
}

export default HomeFeedList
