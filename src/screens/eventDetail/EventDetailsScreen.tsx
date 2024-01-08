import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HomeNavigatorScreenProps } from '../../navigation/home/HomeNavigatorScreenProps'
import { Colors } from '../../styles'
import { StatefulView } from '../shared/StatefulView'
import { EventDetailsContent } from './EventDetailsContent'
import { useEventDetailsScreen } from './useEventDetailsScreen.hook'

type EventDetailsScreenProps = HomeNavigatorScreenProps<'EventDetails'>

const EventDetailsScreen: FC<EventDetailsScreenProps> = ({ route }) => {
  const { statefulState, onReloadEvent } = useEventDetailsScreen(
    route.params.eventId,
  )

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
      <StatefulView
        state={statefulState}
        contentComponent={(detailedEvent) => {
          return (
            <EventDetailsContent
              detailedEvent={detailedEvent}
              onReloadEvent={onReloadEvent}
            />
          )
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
})

export default EventDetailsScreen
