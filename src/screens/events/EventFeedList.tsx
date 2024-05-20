import { memo, useEffect, useMemo, useRef } from 'react'
import { FlatList, Platform } from 'react-native'
import DialogAuth from '@/components/AuthDialog'
import { EventCard, PartialEventCard } from '@/components/Cards/EventCard'
import EmptyEvent from '@/components/EmptyStates/EmptyEvent/EmptyEvent'
import { bottomSheetFilterStates } from '@/components/EventFilterForm/BottomSheetFilters'
import EventFilterForm, { EventFilters, eventFiltersState, Controller as FilterController, FiltersState } from '@/components/EventFilterForm/EventFilterForm'
import SearchBox from '@/components/EventFilterForm/SearchBox'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import { useSession } from '@/ctx/SessionProvider'
import { isFullEvent, isPartialEvent, RestEvent } from '@/data/restObjects/RestEvents'
import { mapFullProps, mapPartialProps } from '@/helpers/eventsFeed'
import { useSuspensePaginatedEvents } from '@/hooks/useEvents'
import { useScrollToTop } from '@react-navigation/native'
import { router } from 'expo-router'
import { getToken, Spinner, useMedia, YStack } from 'tamagui'
import { useDebounce } from 'use-debounce'

const MemoizedEventCard = memo(EventCard) as typeof EventCard
const MemoizedPartialEventCard = memo(PartialEventCard) as typeof PartialEventCard

const SmallHeaderList = (props: { listRef: React.RefObject<FlatList> }) => {
  const { setOpen, open } = bottomSheetFilterStates()
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        props.listRef.current?.scrollToOffset({ offset: 0, animated: true })
      }, 300)
    }
  }, [open])
  const handleFocus = (searchInputRef: FiltersState['searchInputRef']) => () => {
    setOpen(true)
    const data = Boolean(props.listRef.current?.props.data ? props.listRef.current?.props.data.length : 0)
    if (data) props.listRef.current?.scrollToIndex({ index: 0, animated: true, viewOffset: 15 })
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 0)
  }

  return (
    <YStack p="$3" opacity={open ? 0 : 1} overflow="hidden" animation="100ms" animateOnly={['opacity', 'height']}>
      <FilterController name="search">
        {(p) => (
          <SearchBox showSoftInputOnFocus={false} editable={Platform.OS === 'android'} onPressOut={handleFocus(p.ref!)} value={p.value} onChange={p.onChange} />
        )}
      </FilterController>
    </YStack>
  )
}

const HeaderList = (props: { listRef: React.RefObject<FlatList> }) => {
  const media = useMedia()
  if (media.md) {
    return <SmallHeaderList listRef={props.listRef} />
  }

  if (media.lg) {
    return (
      <YStack p="$3" overflow="hidden" animation="100ms" animateOnly={['opacity', 'height']}>
        <EventFilterForm />
      </YStack>
    )
  }
  return null
}

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
  const listRef = useRef<FlatList>(null)
  useScrollToTop(listRef)

  const { value: _filters } = eventFiltersState()
  const [filters] = useDebounce(_filters, 300)

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
      ref={listRef}
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
      keyboardDismissMode="on-drag"
      ListHeaderComponent={media.lg ? <HeaderList listRef={listRef} /> : null}
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
