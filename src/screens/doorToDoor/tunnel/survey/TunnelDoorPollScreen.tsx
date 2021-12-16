import React, { FunctionComponent, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Poll } from '../../../../core/entities/Poll'
import DoorToDoorRepository from '../../../../data/DoorToDoorRepository'
import { TunnelDoorPollScreenProp } from '../../../../navigation'
import { Colors } from '../../../../styles'
import { StatefulView, ViewState } from '../../../shared/StatefulView'
import { useDoorToDoorTunnelNavigationOptions } from '../DoorToDoorTunnelNavigationHook'
import DoorToDoorPollDetailScreenLoaded from './DoorToDoorPollDetailScreenLoaded'

const TunnelDoorPollScreen: FunctionComponent<TunnelDoorPollScreenProp> = ({
  navigation,
  route,
}) => {
  const [statefulState, setStatefulState] = useState<ViewState.Type<Poll>>(
    new ViewState.Loading(),
  )

  useDoorToDoorTunnelNavigationOptions(navigation)

  useEffect(() => {
    DoorToDoorRepository.getInstance()
      .getDoorToDoorPoll(route.params.campaignId)
      .then((poll) => {
        setStatefulState(new ViewState.Content(poll))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [route.params.campaignId])

  return (
    <SafeAreaView style={styles.container}>
      <StatefulView
        state={statefulState}
        contentComponent={(currentPoll) => (
          <DoorToDoorPollDetailScreenLoaded
            poll={currentPoll}
            route={route}
            navigation={navigation}
          />
        )}
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

export default TunnelDoorPollScreen
