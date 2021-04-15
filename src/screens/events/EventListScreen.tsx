import React, { FC, useCallback, useEffect, useState } from 'react'
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
import { EventFilters, ShortEvent } from '../../core/entities/Event'
import PaginatedResult from '../../core/entities/PaginatedResult'
import { GetEventsInteractor } from '../../core/interactor/GetEventsInteractor'
import { Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'
import i18n from '../../utils/i18n'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import LoaderView from '../shared/LoaderView'
import { StatefulView, ViewState } from '../shared/StatefulView'
import EventGridItem from './EventGridItem'
import EventView from './EventView'
import {
  EventSectionViewModel,
  EventRowContainerViewModel,
  EventRowViewModel,
} from './EventViewModel'
import { EventViewModelMapper } from './EventViewModelMapper'

type Props = Readonly<{
  eventFilter: EventFilter
  onEventSelected: (eventId: string) => void
}>

export type EventFilter = 'home' | 'calendar' | 'myEvents'

const EventListScreen: FC<Props> = (props) => {
  const [isRefreshing, setRefreshing] = useState(true)
  const [isLoadingMore, setLoadingMore] = useState(false)
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<PaginatedResult<Array<ShortEvent>>>
  >(new ViewState.Loading())

  const fetchEvents = useCallback(
    (page: number) => {
      const subscribedOnly = props.eventFilter === 'myEvents' ? true : false
      const filters: EventFilters = {
        subscribedOnly: subscribedOnly,
      }
      return new GetEventsInteractor().execute(page, filters)
    },
    [props],
  )
  const loadFirstPage = () => {
    setRefreshing(true)
    fetchEvents(1)
      .then((paginatedResult) => {
        setStatefulState(new ViewState.Content(paginatedResult))
      })
      .catch((error) => {
        setStatefulState(
          new ViewState.Error(GenericErrorMapper.mapErrorMessage(error), () => {
            setStatefulState(new ViewState.Loading())
            loadFirstPage()
          }),
        )
      })
      .finally(() => setRefreshing(false))
  }

  const loadMore = useCallback(() => {
    const currentState = statefulState
    if (currentState instanceof ViewState.Content) {
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
          setStatefulState(new ViewState.Content(newContent))
        })
        .catch((error) => {
          console.log(error)
          // no-op: next page can be reloaded by reaching the end of the list again
        })
        .finally(() => setLoadingMore(false))
    }
  }, [statefulState, fetchEvents])

  useEffect(loadFirstPage, [])

  const EventListContent = (events: Array<EventSectionViewModel>) => {
    const { theme } = useTheme()
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
            viewModel={item.value}
            onEventSelected={props.onEventSelected}
          />
        )
      } else {
        return null
      }
    }
    if (events.length > 0) {
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
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={loadFirstPage}
              colors={[theme.primaryColor]}
            />
          }
          onEndReachedThreshold={0.8}
          onEndReached={loadMore}
        />
      )
    } else {
      return (
        <View style={styles.emptyTextContainer}>
          <Text style={styles.emptyText}>{i18n.t('events.empty')}</Text>
        </View>
      )
    }
  }

  return (
    <StatefulView
      state={statefulState}
      contentComponent={(result) => {
        const viewModel = EventViewModelMapper.map(
          result.result,
          props.eventFilter,
        )
        return EventListContent(viewModel)
      }}
    />
  )
}

const getMockedData = (filter: EventFilter): Array<EventSectionViewModel> => {
  switch (filter) {
    case 'myEvents':
      return []
    case 'home':
      return mockedDataGrouped
    case 'calendar':
      return mockedDataFlat
  }
}

const mockedDataGrouped: Array<EventSectionViewModel> = [
  {
    id: 'conference',
    sectionViewModel: { sectionName: 'Conférences' },
    data: [
      {
        type: 'grouped',
        value: {
          events: [
            {
              id: '1',
              title: 'LREM Senlis Sud Oise - déjeunons Zoom',
              isOnline: true,
              tag: {
                label: 'CONFERENCE',
                backgroundColor: '#4489f7',
                textColor: '#ffffff',
              },
              imageUrl:
                'https://upload.wikimedia.org/wikipedia/fr/thumb/e/e2/Olympique_lyonnais_%28logo%29.svg/980px-Olympique_lyonnais_%28logo%29.svg.png',
              isSubscribed: true,
              date: "Aujourd'hui\n12:00 - 15:00",
            },
            {
              id: '2',
              title: 'Porte à porte Montmartre',
              isOnline: false,
              tag: {
                label: 'CONFERENCE',
                backgroundColor: '#4489f7',
                textColor: '#ffffff',
              },
              isSubscribed: false,
              date: "Aujourd'hui\n11:00 - 15:00",
            },
            {
              id: '3',
              title: 'Porte à porte Montmartre',
              isOnline: false,
              tag: {
                label: 'CONFERENCE',
                backgroundColor: '#4489f7',
                textColor: '#ffffff',
              },
              isSubscribed: false,
              date: "Aujourd'hui\n11:00 - 15:00",
            },
          ],
        },
      },
    ],
  },
  {
    id: 'meeting',
    sectionViewModel: { sectionName: 'Réunions' },
    data: [
      {
        type: 'grouped',
        value: {
          events: [
            {
              id: '10',
              title: 'LREM Senlis Sud Oise - déjeunons Zoom',
              isOnline: true,
              tag: {
                label: 'REUNIONS',
                backgroundColor: '#1c00ff',
                textColor: '#ffffff',
              },
              imageUrl:
                'https://upload.wikimedia.org/wikipedia/fr/thumb/e/e2/Olympique_lyonnais_%28logo%29.svg/980px-Olympique_lyonnais_%28logo%29.svg.png',
              isSubscribed: true,
              date: "Aujourd'hui\n12:00 - 15:00",
            },
            {
              id: '20',
              title: 'Porte à porte Montmartre',
              isOnline: false,
              tag: {
                label: 'REUNIONS',
                backgroundColor: '#1c00ff',
                textColor: '#ffffff',
              },
              isSubscribed: false,
              date: "Aujourd'hui\n11:00 - 15:00",
            },
          ],
        },
      },
    ],
  },
]

const mockedDataFlat: Array<EventSectionViewModel> = [
  {
    id: 'today',
    sectionViewModel: { sectionName: "Aujourd'hui" },
    data: [
      {
        type: 'event',
        value: {
          id: '1',
          title: 'LREM Senlis Sud Oise - déjeunon',
          isOnline: true,
          tag: {
            label: 'CONFERENCE',
            backgroundColor: '#4489f7',
            textColor: '#ffffff',
          },
          imageUrl:
            'https://upload.wikimedia.org/wikipedia/fr/thumb/e/e2/Olympique_lyonnais_%28logo%29.svg/980px-Olympique_lyonnais_%28logo%29.svg.png',
          isSubscribed: true,
          date: '12:00 - 15:00',
        },
      },
      {
        type: 'event',
        value: {
          id: '2',
          title: 'Porte à porte Montmartre',
          isOnline: false,
          tag: {
            label: 'ACTIONS TERRAINS',
            backgroundColor: '#b1d8ff',
            textColor: '#413d45',
          },
          isSubscribed: false,
          date: '11:00 - 15:00',
        },
      },
    ],
  },
  {
    id: 'tomorrow',
    sectionViewModel: { sectionName: 'Mardi 23 mars' },
    data: [
      {
        type: 'event',
        value: {
          id: '4',
          title: 'Échange sur le Grand Paris avec Pâcome',
          isOnline: false,
          tag: {
            label: 'REUNIONS',
            backgroundColor: '#1c00ff',
            textColor: '#ffffff',
          },
          isSubscribed: true,
          date: '12:00 - 15:00',
        },
      },
    ],
  },
]

const styles = StyleSheet.create({
  bottomLoader: {
    margin: Spacing.margin,
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
  section: {
    ...Typography.headline,
    marginBottom: Spacing.unit,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.mediumMargin,
  },
})

export default EventListScreen
