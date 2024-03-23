import { memo, useMemo } from 'react'
import { FlatList } from 'react-native'
import { EventCard } from '@/components/Cards/EventCard'
import { RestShortEvent } from '@/data/restObjects/RestEvents'
import { mapProps } from '@/helpers/eventsFeed'
import { usePaginatedEvents } from '@/hooks/useEvents'
import { useGetProfilObserver } from '@/hooks/useProfil'
import { router } from 'expo-router'
import { getToken, Spinner, useMedia, YStack } from 'tamagui'

const EventListCard = memo((args: { item: RestShortEvent; cb: Parameters<typeof mapProps>[1] }) => {
  const props = mapProps(args.item, args.cb)
  return <EventCard {...props} $sm={{ width: '100%' }} $gtSm={{ width: 500 }} />
})

const EventList = () => {
  const { data: profile } = useGetProfilObserver()
  const media = useMedia()

  const { data: paginatedFeed, fetchNextPage, hasNextPage, refetch, isRefetching } = usePaginatedEvents(profile?.postal_code)

  const handleSubscribe = (id: string) => {}
  const handleShow = (id: string) => {
    router.push({ pathname: '/(tabs)/events/[id]', params: { id } })
  }

  const callbacks = useMemo(
    () => ({
      onSubscribe: handleSubscribe,
      onShow: handleShow,
    }),
    [],
  )

  const feedData = paginatedFeed?.pages.map((page) => page.items).flat()

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
      renderItem={({ item }) => <EventListCard item={item} cb={callbacks} />}
      keyExtractor={(item) => item.uuid}
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
export default EventList
