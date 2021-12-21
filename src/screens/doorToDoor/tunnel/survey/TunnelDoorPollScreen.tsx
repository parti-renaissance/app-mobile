import React, { FunctionComponent, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import {
  DoorToDoorCompletePoll,
  GetDoorToDoorCompletePollInteractor,
} from '../../../../core/interactor/GetDoorToDoorCompletePollInteractor'
import { TunnelDoorPollScreenProp } from '../../../../navigation'
import { Colors } from '../../../../styles'
import { StatefulView, ViewState } from '../../../shared/StatefulView'
import { ViewStateUtils } from '../../../shared/ViewStateUtils'
import { useDoorToDoorTunnelNavigationOptions } from '../DoorToDoorTunnelNavigationHook'
import DoorToDoorPollDetailScreenLoaded from './DoorToDoorPollDetailScreenLoaded'

const TunnelDoorPollScreen: FunctionComponent<TunnelDoorPollScreenProp> = ({
  navigation,
  route,
}) => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<DoorToDoorCompletePoll>
  >(new ViewState.Loading())

  useDoorToDoorTunnelNavigationOptions(navigation)

  useEffect(() => {
    const fetchData = () => {
      new GetDoorToDoorCompletePollInteractor()
        .execute(route.params.campaignId)
        .then((result) => {
          setStatefulState(new ViewState.Content(result))
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
            route={route}
            navigation={navigation}
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
