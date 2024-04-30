import { memo, useMemo, useState } from 'react'
import { FlatList } from 'react-native'
import { Button } from '@/components'
import DialogAuth from '@/components/AuthDialog'
import Input from '@/components/base/Input/Input'
import { EventCard, PartialEventCard } from '@/components/Cards/EventCard'
import EmptyEvent from '@/components/EmptyStates/EmptyEvent/EmptyEvent'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useSession } from '@/ctx/SessionProvider'
import { isFullEvent, isPartialEvent, RestEvent } from '@/data/restObjects/RestEvents'
import { mapFullProps, mapPartialProps } from '@/helpers/eventsFeed'
import { usePaginatedSearchEvents, useSuspensePaginatedEvents } from '@/hooks/useEvents'
import { MessageCircleX, Search, XCircle } from '@tamagui/lucide-icons'
import { router } from 'expo-router'
import { getToken, Spinner, useMedia, XStack, YStack } from 'tamagui'
import { useDebounce } from 'use-debounce'

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

  const [_searchText, setSearchText] = useState('')
  const [searchText] = useDebounce(_searchText, 500)

  const isSearching = searchText.length > 0

  const eventSuspense = useSuspensePaginatedEvents({
    postalCode: user.data?.postal_code,
    filters: {
      finishAfter: new Date(),
    },
  })

  const events = usePaginatedSearchEvents({
    filters: {
      searchText,
    },
  })

  const { data: paginatedFeed, fetchNextPage, hasNextPage, isRefetching, refetch, isLoading } = isSearching ? events : eventSuspense

  console.log('paginatedFeed', isLoading)

  const handleSubscribe = (id: string) => {}
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
      stickyHeaderHiddenOnScroll
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <VoxCard elevation={2} bg="$white1">
          <VoxCard.Content pr="0">
            <XStack justifyContent="space-between" alignItems="center">
              <Input
                placeholder="Rechercher un événement"
                label="Rechercher"
                iconLeft={<Search />}
                loading={Boolean(isRefetching)}
                value={_searchText}
                onChangeText={setSearchText}
              />
              <Button mt="$5" size="md" variant="text" onPress={() => setSearchText('')}>
                <XCircle />
              </Button>
            </XStack>
          </VoxCard.Content>
        </VoxCard>
      }
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
