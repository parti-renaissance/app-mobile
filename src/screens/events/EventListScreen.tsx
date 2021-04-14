import React, { FC, useEffect, useState } from 'react'
import {
  SectionList,
  StyleSheet,
  SectionListRenderItemInfo,
  Text,
  ListRenderItemInfo,
  View,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import EventRepository from '../../data/EventRepository'
import { Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { GenericErrorMapper } from '../shared/ErrorMapper'
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

const EventListContent = (
  events: Array<EventSectionViewModel>,
  props: Props,
) => {
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
        keyExtractor={(item, index) => item.type + index}
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

const EventListScreen: FC<Props> = (props) => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<Array<EventSectionViewModel>>
  >(new ViewState.Loading())

  const fetchData = () => {
    if (props.eventFilter === 'calendar') {
      EventRepository.getInstance()
        .getEvents(1)
        .then((result) => {
          const viewModel = EventViewModelMapper.map(result, props.eventFilter)
          setStatefulState(new ViewState.Content(viewModel))
        })
        .catch((error) => {
          console.log(error)
          setStatefulState(
            new ViewState.Error(
              GenericErrorMapper.mapErrorMessage(error),
              () => {
                setStatefulState(new ViewState.Loading())
                fetchData()
              },
            ),
          )
        })
    } else {
      setStatefulState(new ViewState.Content(getMockedData(props.eventFilter)))
    }
  }

  useEffect(fetchData, [])

  return (
    <StatefulView
      state={statefulState}
      contentComponent={(value) => EventListContent(value, props)}
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
