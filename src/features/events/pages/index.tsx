import { useEffect, useMemo, useRef } from 'react'
import { Platform, SectionList } from 'react-native'
import Text from '@/components/base/Text'
import EmptyEvent from '@/components/EmptyStates/EmptyEvent/EmptyEvent'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import { useSession } from '@/ctx/SessionProvider'
import { bottomSheetFilterStates } from '@/features/events/components/EventFilterForm/BottomSheetFilters'
import EventFilterForm, { eventFiltersState, Controller as FilterController, FiltersState } from '@/features/events/components/EventFilterForm/EventFilterForm'
import SearchBox from '@/features/events/components/EventFilterForm/SearchBox'
import EventListItem from '@/features/events/components/EventListItem'
import { useSuspensePaginatedEvents } from '@/services/events/hook'
import { RestItemEvent, RestPublicItemEvent } from '@/services/events/schema'
import { useGetProfil } from '@/services/profile/hook'
import { useScrollToTop } from '@react-navigation/native'
import { ChevronDown, Filter } from '@tamagui/lucide-icons'
import { isPast } from 'date-fns'
import { getToken, Spinner, useMedia, XStack, YStack } from 'tamagui'
import { useDebounce } from 'use-debounce'

const splitEvents = (events: RestItemEvent[] | RestPublicItemEvent[]) => {
  const incomming: typeof events = []
  const past: typeof events = []
  events.forEach((event) => {
    if (isPast(event.finish_at)) {
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

const SmallHeaderList = (props: { listRef: React.RefObject<SectionList<{ title: string; data: RestItemEvent[] }[]>> }) => {
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
            onPress={handleFocus(p.ref!)}
            value={p.value}
            onChange={p.onChange}
          />
        )}
      </FilterController>
    </YStack>
  )
}

const EventList = ({ activeTab }: { activeTab: 'events' | 'myEvents' }) => {
  const media = useMedia()
  const { session } = useSession()
  const user = useGetProfil({ enabled: Boolean(session) })
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
        gap: getToken('$medium', 'space'),
        paddingTop: 0,
        paddingLeft: media.gtSm ? getToken('$medium', 'space') : undefined,
        paddingRight: media.gtSm ? getToken('$medium', 'space') : undefined,
        paddingBottom: getToken('$10', 'space'),
      }}
      sections={feedData}
      renderItem={({ item }) => <EventListItem event={item} userUuid={user.data?.uuid} />}
      renderSectionHeader={({ section }) => {
        return (
          <XStack gap="$2" $md={{ paddingLeft: '$medium' }} $gtLg={{ paddingTop: section.index === 0 ? '$6' : 0 }}>
            <Text.MD color={section.data.length === 0 ? '$textDisabled' : '$gray4'} semibold>
              {`${section.title} ${section.index === 0 ? `(${section.data.length})` : ''}`.toUpperCase()}
            </Text.MD>
            <ChevronDown size={16} color="$textPrimary" />
          </XStack>
        )
      }}
      ListEmptyComponent={
        <PageLayout.StateFrame>
          <EmptyEvent state="évenements" />
        </PageLayout.StateFrame>
      }
      keyboardDismissMode="on-drag"
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
