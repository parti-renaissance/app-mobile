import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageSourcePropType,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { DoorToDoorPollConfigDoorStatus } from '../../../../core/entities/DoorToDoorPollConfig'
import { SendDoorPollAnswersInteractor } from '../../../../core/interactor/SendDoorPollAnswersInteractor'
import DoorToDoorRepository from '../../../../data/DoorToDoorRepository'
import {
  DoorToDoorTunnelOpeningScreenProp,
  Screen,
} from '../../../../navigation'
import { Colors, Spacing, Typography } from '../../../../styles'
import i18n from '../../../../utils/i18n'
import { AlertUtils } from '../../../shared/AlertUtils'
import LoadingOverlay from '../../../shared/LoadingOverlay'
import { StatefulView, ViewState } from '../../../shared/StatefulView'
import { TouchablePlatform } from '../../../shared/TouchablePlatform'
import { ViewStateUtils } from '../../../shared/ViewStateUtils'
import { useDoorToDoorTunnelNavigationOptions } from '../DoorToDoorTunnelNavigationHook'

type CardItemProps = {
  onPress: () => void
  title: string
}

const TunnelDoorOpeningScreen: FunctionComponent<DoorToDoorTunnelOpeningScreenProp> = ({
  navigation,
  route,
}) => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<DoorToDoorPollConfigDoorStatus[]>
  >(new ViewState.Loading())
  const [isSendingChoice, setIsSendingChoice] = useState(false)

  useDoorToDoorTunnelNavigationOptions(navigation)

  useEffect(() => {
    DoorToDoorRepository.getInstance()
      .getDoorToDoorPollConfig(route.params.campaignId)
      .then((pollConfig) => {
        setStatefulState(new ViewState.Content(pollConfig.before.doorStatus))
      })
      .catch((error) => {
        setStatefulState(ViewStateUtils.networkError(error))
      })
  }, [route.params, setStatefulState])

  const onChoice = (success: boolean, code: string) => {
    if (success) {
      navigation.navigate(Screen.tunnelDoorInterlocutor, {
        campaignId: route.params.campaignId,
        buildingParams: route.params.buildingParams,
      })
    } else {
      setIsSendingChoice(true)
      new SendDoorPollAnswersInteractor()
        .execute(route.params.campaignId, code, route.params.buildingParams)
        .then(() => {
          navigation.navigate(Screen.tunnelDoorSelectionScreen, {
            campaignId: route.params.campaignId,
            buildingParams: {
              ...route.params.buildingParams,
              door: route.params.buildingParams.door + 1,
            },
            canCloseFloor: true,
          })
        })
        .catch((error) =>
          AlertUtils.showNetworkAlert(error, () => {
            onChoice(success, code)
          }),
        )
        .finally(() => setIsSendingChoice(false))
    }
  }

  const CardItem = ({ onPress, title }: CardItemProps) => (
    <View style={styles.card}>
      <TouchablePlatform
        style={styles.cardContent}
        onPress={onPress}
        touchHighlight={Colors.touchHighlight}
      >
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>{title}</Text>
        </View>
      </TouchablePlatform>
    </View>
  )

  const ContentComponent = (status: DoorToDoorPollConfigDoorStatus[]) => {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          {i18n.t('doorToDoor.tunnel.opening.title')}
        </Text>
        {status.map((item) => {
          return (
            <CardItem
              key={item.code}
              onPress={() => {
                onChoice(item.success, item.code)
              }}
              title={item.label}
            />
          )
        })}
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <LoadingOverlay visible={isSendingChoice} />
      <StatefulView state={statefulState} contentComponent={ContentComponent} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonTitle: {
    ...Typography.title2,
    flex: 1,
    marginLeft: Spacing.margin,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.lightBackground,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    marginBottom: Spacing.unit,
    overflow: 'hidden',
  },
  cardContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: Spacing.margin,
  },
  title: {
    ...Typography.title3,
    marginBottom: Spacing.margin,
  },
})

export default TunnelDoorOpeningScreen
