import React, { FC, useLayoutEffect } from 'react'
import { Header } from '@/components'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import { EventMode } from '@/core/entities/Event'
import { EventNavigatorScreenProps } from '@/navigation/event/EventNavigatorScreenProps'
import EventListScreen from '@/screens/events/EventListScreen'
import { useEventsScreen } from '@/screens/events/useEventsScreen.hook'
import HomeFeedList from '@/screens/home/feed/HomeFeedList'
import { EventsFilterButton } from '@/screens/shared/NavigationHeaderButton'
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router'
import { YStack } from 'tamagui'

type EventsScreenProps = EventNavigatorScreenProps<'Events'>

const EventsScreen: FC<EventsScreenProps> = () => {
  const navigation = useNavigation()
  const { mode: eventMode } = useLocalSearchParams<{ mode: EventMode }>()

  const { searchText, onFiltersSelected } = useEventsScreen(eventMode)

  useLayoutEffect(() => {
    const updateNavigationHeader = () => {
      navigation.setOptions({
        headerRight: () => <EventsFilterButton onPress={onFiltersSelected} />,
      })
    }
    updateNavigationHeader()
  }, [navigation, onFiltersSelected])

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <Header hideLogo />,
        }}
      />
      <EventListScreen eventFilter="home" searchText={searchText} eventModeFilter={eventMode} />
    </>
  )
}

export default EventsScreen
