import React, { FC } from 'react'
import { Text } from 'react-native'

type Props = Readonly<{
  eventFilter: EventFilter
}>

type EventFilter = 'home' | 'calendar' | 'myEvents'

const EventListScreen: FC<Props> = (props) => {
  return <Text>filter: {props.eventFilter}</Text>
}

export default EventListScreen
