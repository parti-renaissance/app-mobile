import React, { FunctionComponent, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import {
  DoorToDoorCompletePoll,
  GetDoorToDoorCompletePollInteractor,
} from '../../../../core/interactor/GetDoorToDoorCompletePollInteractor'
import { TunnelDoorPollScreenProp } from '../../../../navigation'
import { Colors } from '../../../../styles'
import { GenericErrorMapper } from '../../../shared/ErrorMapper'
import { StatefulView, ViewState } from '../../../shared/StatefulView'
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
    const fetchData = (campaignId: string) => {
      new GetDoorToDoorCompletePollInteractor()
        .execute(campaignId)
        .then((result) => {
          setStatefulState(new ViewState.Content(result))
        })
        .catch((error) => handleError(error))
    }
    const handleError = (error: Error) => {
      console.error(error)
      setStatefulState(
        new ViewState.Error(GenericErrorMapper.mapErrorMessage(error), () => {
          fetchData(route.params.campaignId)
        }),
      )
    }
    fetchData(route.params.campaignId)
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
