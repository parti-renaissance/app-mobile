import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import {
  DoorToDoorCompletePoll,
  GetDoorToDoorCompletePollInteractor,
} from '@/core/interactor/GetDoorToDoorCompletePollInteractor'
import { useDoorToDoorStore } from '@/data/store/door-to-door'
import DoorToDoorPollDetailScreenLoaded from '@/screens/doorToDoor/tunnel/survey/DoorToDoorPollDetailScreenLoaded'
import { useDoorToDoorTunnelNavigationOptions } from '@/screens/doorToDoor/tunnel/useDoorToDoorTunnelNavigationOptions.hook'
import { StatefulView } from '@/screens/shared/StatefulView'
import { ViewState } from '@/screens/shared/ViewState'
import { ViewStateUtils } from '@/screens/shared/ViewStateUtils'
import { Colors } from '@/styles'

const TunnelDoorPollScreen = () => {
  const [statefulState, setStatefulState] = useState<
    ViewState<DoorToDoorCompletePoll>
  >(ViewState.Loading())

  const {
    address: {
      building: { campaignStatistics },
    },
  } = useDoorToDoorStore()

  useDoorToDoorTunnelNavigationOptions()

  useEffect(() => {
    const fetchData = () => {
      new GetDoorToDoorCompletePollInteractor()
        .execute(campaignStatistics.campaignId)
        .then((result) => {
          setStatefulState(ViewState.Content(result))
        })
        .catch((error) =>
          setStatefulState(ViewStateUtils.networkError(error, fetchData)),
        )
    }
    fetchData()
  }, [campaignStatistics.campaignId])

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
