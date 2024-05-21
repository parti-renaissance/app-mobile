import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { Platform, SectionList } from 'react-native'
import DialogAuth from '@/components/AuthDialog'
import Text from '@/components/base/Text'
import { EventCard, PartialEventCard } from '@/components/Cards/EventCard'
import EmptyEvent from '@/components/EmptyStates/EmptyEvent/EmptyEvent'
import { bottomSheetFilterStates } from '@/components/EventFilterForm/BottomSheetFilters'
import EventFilterForm, { eventFiltersState, Controller as FilterController, FiltersState } from '@/components/EventFilterForm/EventFilterForm'
import SearchBox from '@/components/EventFilterForm/SearchBox'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import { useSession } from '@/ctx/SessionProvider'
import { isFullEvent, isPartialEvent, RestEvent } from '@/data/restObjects/RestEvents'
import { mapFullProps, mapPartialProps } from '@/helpers/eventsFeed'
import { useSuspensePaginatedEvents } from '@/hooks/useEvents'
import { useScrollToTop } from '@react-navigation/native'
import { ChevronDown, Filter } from '@tamagui/lucide-icons'
import { router } from 'expo-router'
import { getToken, Spinner, useMedia, XStack, YStack } from 'tamagui'
import { useDebounce } from 'use-debounce'

const MemoizedEventCard = memo(EventCard) as typeof EventCard
const MemoizedPartialEventCard = memo(PartialEventCard) as typeof PartialEventCard

const splitEvents = (events: RestEvent[]) => {
  let incomming: RestEvent[] = []
  let past: RestEvent[] = []
  events.forEach((event) => {
    if (new Date(event.begin_at) < new Date()) {
      past.push(event)
    } else {
      incomming.push(event)
    }
  })
  if (incomming.length === 0 && past.length === 0) {
    return []
  }

  return [
    { title: 'À venir', data: incomming, index: 0 },
    { title: 'Évènements passées', data: past, index: 1 },
  ]
}

const SmallHeaderList = (props: { listRef: React.RefObject<SectionList<{ title: string; data: RestEvent[] }[]>> }) => {
  const { setOpen, open } = bottomSheetFilterStates()
  const sections = props.listRef.current?.props.sections
  const data = Boolean(sections && sections.length > 0 && (sections[0].data.length > 0 || sections[1].data.length > 0))
  useEffect(() => {
    if (!open && data) {
      setTimeout(() => {
        props.listRef.current?.scrollToLocation({ itemIndex: 0, sectionIndex: 0, animated: true, viewOffset: 100 })
      }, 300)
    }
  }, [open])
  const handleFocus = (searchInputRef: FiltersState['searchInputRef']) => () => {
    setOpen(true)

    if (data) props.listRef.current?.scrollToLocation({ itemIndex: 0, sectionIndex: 0, animated: true, viewOffset: Platform.OS === 'android' ? -30 : -100 })
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 0)
  }

  return (
    <YStack p="$3" opacity={open ? 0 : 1} overflow="hidden" animation="100ms" animateOnly={['opacity', 'height']}>
      <FilterController name="search">
        {(p) => (
          <SearchBox
            showSoftInputOnFocus={false}
            DefaultIcon={Filter}
            editable={Platform.OS === 'android'}
            placeholder="Rechercher et filtrer"
            onPressOut={handleFocus(p.ref!)}
            value={p.value}
            onChange={p.onChange}
          />
        )}
      </FilterController>
    </YStack>
  )
}

const HeaderList = (props: { listRef: React.RefObject<SectionList> }) => {
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

const EventList = ({ activeTab }: { activeTab: 'events' | 'myEvents' }) => {
  const media = useMedia()
  const { user } = useSession()
  const listRef = useRef<SectionList>(null)
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
      searchText: filters.search,
      subscribedOnly: activeTab === 'myEvents',
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

  const feedData = useMemo(() => {
    if (!paginatedFeed) return []
    return splitEvents(paginatedFeed.pages.flatMap((page) => page.items))
  }, [paginatedFeed])

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <SectionList
      style={{ width: '100%' }}
      ref={listRef}
      stickySectionHeadersEnabled={false}
      contentContainerStyle={{
        flexGrow: 1,
        // height: '100%',
        gap: getToken('$4', 'space'),
        paddingTop: 0,
        paddingLeft: media.gtSm ? getToken('$7', 'space') : undefined,
        paddingRight: media.gtSm ? getToken('$7', 'space') : undefined,
        paddingBottom: getToken('$10', 'space'),
        // height: feedData.length === 0 && !isLoading && media.sm ? '100%' : undefined,
      }}
      sections={feedData}
      renderItem={({ item }) => <EventListCard item={item} cb={callbacks} />}
      renderSectionHeader={({ section }) => {
        return (
          <XStack gap="$2" $md={{ paddingLeft: '$4' }} $gtLg={{ paddingTop: section.index === 0 ? '$6' : 0 }}>
            <Text fontWeight="$6" color={section.data.length === 0 ? '$textDisabled' : '$textPrimary'}>
              {section.title} {section.index === 0 ? `(${section.data.length})` : ''}
            </Text>
            <ChevronDown size={16} color="$textPrimary" />
          </XStack>
        )
      }}
      ListEmptyComponent={
        <PageLayout.StateFrame>
          <EmptyEvent />
        </PageLayout.StateFrame>
      }
      keyboardDismissMode="on-drag"
      ListHeaderComponent={
        media.lg ? (
          <YStack>
            <HeaderList listRef={listRef} />
          </YStack>
        ) : null
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
