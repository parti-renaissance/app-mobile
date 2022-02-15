import React, { FC, useCallback, useState } from 'react'
import {
  SectionList,
  StyleSheet,
  SectionListRenderItemInfo,
  Text,
  ListRenderItemInfo,
  View,
  RefreshControl,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { EventFilters, EventMode, ShortEvent } from '../../core/entities/Event'
import PaginatedResult from '../../core/entities/PaginatedResult'
import { GetEventsInteractor } from '../../core/interactor/GetEventsInteractor'
import { Colors, Spacing, Typography } from '../../styles'
import { DateProvider } from '../../utils/DateProvider'
import i18n from '../../utils/i18n'
import LoaderView from '../shared/LoaderView'
import { StatefulView, ViewState } from '../shared/StatefulView'
import EventGridItem from './EventGridItem'
import EventView from './EventView'
import {
  EventSectionViewModel,
  EventRowContainerViewModel,
  EventRowViewModel,
} from './EventViewModel'
import { EventSectionViewModelMapper } from './EventSectionViewModelMapper'
import { GetMainEventsInteractor } from '../../core/interactor/GetMainEventsInteractor'
import { useFocusEffect } from '@react-navigation/core'
import { ViewStateUtils } from '../shared/ViewStateUtils'

type Props = Readonly<{
  eventFilter: EventFilter
  searchText?: string
  eventModeFilter?: EventMode
  onEventSelected: (event: EventRowViewModel) => void
}>

export type EventFilter = 'home' | 'calendar' | 'myEvents'

const EventListScreen: FC<Props> = (props) => {
  const [isRefreshing, setRefreshing] = useState(true)
  const [isLoadingMore, setLoadingMore] = useState(false)
  const [statefulState, setStatefulState] = useState<
    ViewState<PaginatedResult<Array<ShortEvent>>>
  >(ViewState.Loading())

  const fetchEvents = useCallback(
    (page: number) => {
      const subscribedOnly = props.eventFilter === 'myEvents' ? true : false
      const filters: EventFilters = {
        subscribedOnly: subscribedOnly,
        finishAfter: DateProvider.now(),
        searchText: props.searchText,
        mode: props.eventModeFilter,
      }
      if (props.eventFilter === 'home') {
        return new GetMainEventsInteractor().execute(filters)
      } else {
        return new GetEventsInteractor().execute(page, filters)
      }
    },
    [props.eventFilter, props.searchText, props.eventModeFilter],
  )
  const loadFirstPage = useCallback(() => {
    fetchEvents(1)
      .then((paginatedResult) => {
        setStatefulState(ViewState.Content(paginatedResult))
      })
      .catch((error) => {
        setStatefulState(
          ViewStateUtils.networkError(error, () => {
            setStatefulState(ViewState.Loading())
            loadFirstPage()
          }),
        )
      })
      .finally(() => setRefreshing(false))
  }, [fetchEvents])

  const refreshData = useCallback(() => {
    setRefreshing(true)
    loadFirstPage()
  }, [loadFirstPage])

  const loadMore = useCallback(() => {
    const currentState = statefulState
    if (currentState.state === 'content') {
      const content = currentState.content
      const paginationInfo = content.paginationInfo

      if (paginationInfo.currentPage === paginationInfo.lastPage) {
        // last page reached : nothing to paginate
        return
      }
      setLoadingMore(true)
      fetchEvents(paginationInfo.currentPage + 1)
        .then((paginatedResult) => {
          const newContent = {
            paginationInfo: paginatedResult.paginationInfo,
            result: content.result.concat(paginatedResult.result),
          }
          setStatefulState(ViewState.Content(newContent))
        })
        .catch((error) => {
          console.log(error)
          // no-op: next page can be reloaded by reaching the end of the list again
        })
        .finally(() => setLoadingMore(false))
    }
  }, [statefulState, fetchEvents])

  // There is no pagination for the main home
  const onEndReached = props.eventFilter === 'home' ? undefined : loadMore

  useFocusEffect(
    useCallback(() => {
      setStatefulState(ViewState.Loading())
      loadFirstPage()
    }, [loadFirstPage]),
  )

  const EventListContent = (events: Array<EventSectionViewModel>) => {
    const renderItemHorizontal = (
      info: ListRenderItemInfo<EventRowViewModel>,
      totalItemCount: number,
    ) => {
      const isLastItem = info.index + 1 === totalItemCount
      const marginEnd = isLastItem ? Spacing.margin : 0
      return (
        <EventGridItem
          style={[styles.eventGridCell, { marginEnd: marginEnd }]}
          viewModel={info.item}
          onEventSelected={props.onEventSelected}
        />
      )
    }
    const renderItem = ({
      item,
    }: SectionListRenderItemInfo<EventRowContainerViewModel>) => {
      if (item.type === 'grouped') {
        return (
          <FlatList
            horizontal={true}
            data={item.value.events}
            renderItem={(info) =>
              renderItemHorizontal(info, item.value.events.length)
            }
          />
        )
      } else if (item.type === 'event') {
        return (
          <EventView
            style={styles.eventView}
            viewModel={item.value}
            onEventSelected={props.onEventSelected}
          />
        )
      } else {
        return null
      }
    }
    return (
      <SectionList
        stickySectionHeadersEnabled={false}
        sections={events}
        renderItem={renderItem}
        renderSectionHeader={({ section: { sectionViewModel } }) => {
          return sectionViewModel !== undefined ? (
            <Text style={styles.section}>{sectionViewModel.sectionName}</Text>
          ) : null
        }}
        ListFooterComponent={
          isLoadingMore ? <LoaderView style={styles.bottomLoader} /> : null
        }
        keyExtractor={(item) => {
          switch (item.type) {
            case 'event':
              return item.value.id
            case 'grouped':
              return item.value.events[0]?.id
          }
        }}
        ListEmptyComponent={() => {
          return (
            <View style={styles.emptyTextContainer}>
              <Text style={styles.emptyText}>{i18n.t('events.empty')}</Text>
            </View>
          )
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshData}
            colors={[Colors.primaryColor]}
          />
        }
        contentContainerStyle={styles.contentContainerStyle}
        onEndReachedThreshold={0.8}
        onEndReached={onEndReached}
      />
    )
  }

  return (
    <StatefulView
      state={statefulState}
      contentComponent={(result) => {
        const viewModel = EventSectionViewModelMapper.map(
          result.result,
          props.eventFilter,
        )
        return EventListContent(viewModel)
      }}
    />
  )
}

const styles = StyleSheet.create({
  bottomLoader: {
    margin: Spacing.margin,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  emptyText: {
    ...Typography.body,
  },
  emptyTextContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.margin,
  },
  eventGridCell: {
    marginStart: Spacing.margin,
    marginVertical: Spacing.margin,
  },
  eventView: {
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.unit,
  },
  section: {
    ...Typography.title3,
    color: Colors.titleText,
    marginBottom: Spacing.unit,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.mediumMargin,
  },
})

export default EventListScreen
