import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { EventDetailsScreenProps } from '../../navigation'

const EventDetailsScreen: FC<EventDetailsScreenProps> = ({ route }) => {
  const eventId = route.params.eventId
  return <SafeAreaView />
}

const styles = StyleSheet.create({})

export default EventDetailsScreen
