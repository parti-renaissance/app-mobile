import React, { FunctionComponent, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import {
  DoorToDoorCompletePoll,
  GetDoorToDoorCompletePollInteractor,
} from '../../../../core/interactor/GetDoorToDoorCompletePollInteractor'
import { DoorToDoorTunnelModalNavigatorScreenProps } from '../../../../navigation/DoorToDoorTunnelModalNavigator'
import { Colors } from '../../../../styles'
import { StatefulView, ViewState } from '../../../shared/StatefulView'
import { ViewStateUtils } from '../../../shared/ViewStateUtils'
import { useDoorToDoorTunnelNavigationOptions } from '../DoorToDoorTunnelNavigationHook'
import DoorToDoorPollDetailScreenLoaded from './DoorToDoorPollDetailScreenLoaded'

type TunnelDoorPollScreenProps = DoorToDoorTunnelModalNavigatorScreenProps<'TunnelDoorPoll'>

const TunnelDoorPollScreen: FunctionComponent<TunnelDoorPollScreenProps> = ({
  navigation,
  route,
}) => {
  const [statefulState, setStatefulState] = useState<
    ViewState<DoorToDoorCompletePoll>
  >(ViewState.Loading())

  useDoorToDoorTunnelNavigationOptions(navigation)

  useEffect(() => {
    const fetchData = () => {
      new GetDoorToDoorCompletePollInteractor()
        .execute(route.params.campaignId)
        .then((result) => {
          setStatefulState(ViewState.Content(result))
        })
        .catch((error) =>
          setStatefulState(ViewStateUtils.networkError(error, fetchData)),
        )
    }
    fetchData()
  }, [route.params.campaignId])

  return (
    <SafeAreaView style={styles.container}>
      <StatefulView
        state={statefulState}
        contentComponent={(completePoll) => (
          <DoorToDoorPollDetailScreenLoaded
            poll={completePoll.poll}
            qualification={completePoll.config.after}
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
