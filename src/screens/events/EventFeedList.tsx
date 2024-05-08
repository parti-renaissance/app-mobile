import { memo, useMemo } from 'react'
import { FlatList } from 'react-native'
import DialogAuth from '@/components/AuthDialog'
import { EventCard, PartialEventCard } from '@/components/Cards/EventCard'
import EmptyEvent from '@/components/EmptyStates/EmptyEvent/EmptyEvent'
import { eventFiltersState } from '@/components/EventFilterForm/EventFilterForm'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import { useSession } from '@/ctx/SessionProvider'
import { isFullEvent, isPartialEvent, RestEvent } from '@/data/restObjects/RestEvents'
import { mapFullProps, mapPartialProps } from '@/helpers/eventsFeed'
import { usePaginatedSearchEvents, useSuspensePaginatedEvents } from '@/hooks/useEvents'
import { router } from 'expo-router'
import { getToken, Spinner, useMedia, YStack } from 'tamagui'

const MemoizedEventCard = memo(EventCard) as typeof EventCard
const MemoizedPartialEventCard = memo(PartialEventCard) as typeof PartialEventCard

const EventListCard = memo((args: { item: RestEvent; cb: Parameters<typeof mapFullProps>[1] }) => {
  if (isFullEvent(args.item)) {
    return <MemoizedEventCard {...mapFullProps(args.item, args.cb)} />
  }
  if (isPartialEvent(args.item)) {
    return (
      <AuthFallbackWrapper
        fallback={
          <DialogAuth title="D'autres événements vous attendent, connectez-vous ou créez un compte !">
            <MemoizedPartialEventCard {...mapPartialProps(args.item, args.cb)} />
          </DialogAuth>
        }
      >
        <PartialEventCard {...mapPartialProps(args.item, args.cb)} />
      </AuthFallbackWrapper>
    )
  }
  return null
})

const EventList = () => {
  const media = useMedia()
  const { user } = useSession()

  const { value: filters } = eventFiltersState()

  const {
    data: paginatedFeed,
    fetchNextPage,
    hasNextPage,
    isRefetching,
    refetch,
  } = useSuspensePaginatedEvents({
    postalCode: user.data?.postal_code,
    filters: {
      finishAfter: filters.showPast ? undefined : new Date(),
      searchText: filters.search,
    },
  })

  const handleSubscribe = (_: string) => {}
  const handleShow = (id: string) => {
    router.push({ pathname: '/(tabs)/evenements/[id]', params: { id } })
  }

  const callbacks = useMemo(
    () => ({
      onSubscribe: handleSubscribe,
      onShow: handleShow,
    }),
    [],
  )

  const feedData = paginatedFeed?.pages.map((page) => page.items).flat() ?? []

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <FlatList
      style={{ width: '100%' }}
      contentContainerStyle={{
        flexGrow: 1,
        gap: getToken('$4', 'space'),
        paddingTop: media.gtSm ? getToken('$7', 'space') : getToken('$4', 'space'),
        paddingLeft: media.gtSm ? getToken('$7', 'space') : undefined,
        paddingRight: media.gtSm ? getToken('$7', 'space') : undefined,
        paddingBottom: getToken('$10', 'space'),
        // height: feedData.length === 0 && !isLoading && media.sm ? '100%' : undefined,
      }}
      data={feedData}
      renderItem={({ item }) => <EventListCard item={item} cb={callbacks} />}
      ListEmptyComponent={
        <PageLayout.StateFrame>
          <EmptyEvent />
        </PageLayout.StateFrame>
      }
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
