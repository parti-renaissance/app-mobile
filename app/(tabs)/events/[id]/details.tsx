import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HomeNavigatorScreenProps } from '@/navigation/home/HomeNavigatorScreenProps'
import { Colors } from '@/styles'
import { StatefulView } from '@/screens/shared/StatefulView'
import { EventDetailsContent } from '@/screens/eventDetail/EventDetailsContent'
import { useEventDetailsScreen } from '@/screens/eventDetail/useEventDetailsScreen.hook'
import { useLocalSearchParams } from 'expo-router'

type EventDetailsScreenProps = HomeNavigatorScreenProps<'EventDetails'>

const EventDetailsScreen: FC<EventDetailsScreenProps> = ({ route }) => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { statefulState, onReloadEvent } = useEventDetailsScreen(id)

  return (
    <View style={styles.container}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
})

export default EventDetailsScreen
