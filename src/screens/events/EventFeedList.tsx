// first fetch profile,
import { memo } from 'react'
import { FlatList } from 'react-native'
import { FeedCard } from '@/components/Cards'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import ApiService from '@/data/network/ApiService'
import { RestDetailedEvent, RestEvents, RestShortEvent } from '@/data/restObjects/RestEvents'
import { useGetProfilObserver } from '@/hooks/useProfil'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { getToken, Stack, Text, useMedia } from 'tamagui'

const TimelineFeedCard = memo((item: RestShortEvent) => {
  const payload = {
    title: item.name,
    tag: item?.category?.event_group_category.name,
    image: item.image_url || 'https://picsum.photos/600/244',
    isSubscribed: !!item.user_registered_at,
    isOnline: item.mode === 'online',
    location: {
      street: item.post_address?.address,
      postalCode: item.post_address?.postal_code,
      city: item?.post_address?.city_name,
    },
    author: {
      role: `Par ${item.organizer?.first_name} ${item.organizer?.last_name}`,
      pictureLink: 'https://picsum.photos/200/200',
    },
    date: new Date(),
  }
  return (
    <FeedCard
      type="event"
      payload={payload}
      onSubscribe={() => {
        console.log('subscribe')
      }}
    />
  )
})

const renderEventItem = ({ item }: { item: RestShortEvent }) => {
  return <TimelineFeedCard {...item} />
}

const fetchTimelineEvents = async (page: number, zipCode?: string) => await ApiService.getInstance().getEvents(zipCode, page)

const EventFeedList = () => {
  const { data: profile } = useGetProfilObserver()
  const media = useMedia()

  const {
    data: paginatedEvents,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['events'],
    queryFn: ({ pageParam }) => fetchTimelineEvents(pageParam, profile?.postal_code),
    getNextPageParam: (lastPage) => lastPage.metadata.current_page + 1,
    getPreviousPageParam: (firstPage) => firstPage.metadata.current_page - 1,
    initialPageParam: 1,
  })

  const eventsData = paginatedEvents?.pages.map((page) => page.items).flat()

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <PageLayout sidebar={<Text>Test</Text>}>
      <Stack $gtSm={{ flexDirection: 'row', height: '100%', gap: 8, overflow: 'scroll' }} height={'100vh'}>
        <Stack $gtSm={{ flex: 6 }} gap={2} alignContent="center" height={'100'} alignItems="center" overflow="scroll">
          <FlatList
            style={{ paddingTop: getToken('$space.3'), maxWidth: 440 }}
            contentContainerStyle={{ gap: getToken('$space.3') }}
            scrollEnabled={!media.gtSm}
            data={eventsData}
            renderItem={renderEventItem}
            // keyExtractor={(item) => item.objectID}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
          />
        </Stack>
      </Stack>
    </PageLayout>
  )
}

export default EventFeedList
