import React, { FC } from 'react'
import {
  SectionList,
  StyleSheet,
  SectionListRenderItemInfo,
  Text,
  View,
} from 'react-native'
import { Spacing, Typography } from '../../styles'
import EventView from './EventView'
import {
  EventSectionViewModel,
  EventRowContainerViewModel,
} from './EventViewModel'

type Props = Readonly<{
  eventFilter: EventFilter
}>

type EventFilter = 'home' | 'calendar' | 'myEvents'

const EventListScreen: FC<Props> = (props) => {
  const mockedData: Array<EventSectionViewModel> = [
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
            tag: 'CONFERENCE',
            tagBackgroundColor: '#4489f7',
            tagTextColor: '#ffffff',
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
            tag: 'ACTIONS TERRAINS',
            tagBackgroundColor: '#b1d8ff',
            tagTextColor: '#413d45',
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
            tag: 'REUNIONS',
            tagBackgroundColor: '#1c00ff',
            tagTextColor: '#ffffff',
            isSubscribed: true,
            date: '12:00 - 15:00',
          },
        },
      ],
    },
  ]
  const renderItem = ({
    item,
  }: SectionListRenderItemInfo<EventRowContainerViewModel>) => {
    if (item.type === 'grouped') {
      // TODO
      return <View />
    } else if (item.type === 'event') {
      return <EventView viewModel={item.value} />
    } else {
      return null
    }
  }
  return (
    <SectionList
      stickySectionHeadersEnabled={false}
      sections={mockedData}
      renderItem={renderItem}
      renderSectionHeader={({ section: { sectionViewModel } }) => {
        return sectionViewModel !== undefined ? (
          <Text style={styles.section}>{sectionViewModel.sectionName}</Text>
        ) : null
      }}
      keyExtractor={(item, index) => item.type + index}
    />
  )
}

const styles = StyleSheet.create({
  section: {
    ...Typography.headline,
    marginTop: Spacing.mediumMargin,
    marginBottom: Spacing.unit,
    marginHorizontal: Spacing.margin,
  },
})

export default EventListScreen
