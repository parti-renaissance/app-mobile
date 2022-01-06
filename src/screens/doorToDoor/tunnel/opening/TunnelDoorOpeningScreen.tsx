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
import DoorToDoorRepository from '../../../../data/DoorToDoorRepository'
import {
  DoorToDoorTunnelOpeningScreenProp,
  Screen,
} from '../../../../navigation'
import { Colors, Spacing, Typography } from '../../../../styles'
import i18n from '../../../../utils/i18n'
import { StatefulView, ViewState } from '../../../shared/StatefulView'
import { TouchablePlatform } from '../../../shared/TouchablePlatform'
import { ViewStateUtils } from '../../../shared/ViewStateUtils'
import { useDoorToDoorTunnelNavigationOptions } from '../DoorToDoorTunnelNavigationHook'

type CardItemProps = {
  onPress: () => void
  title: string
  image: ImageSourcePropType
}

const TunnelDoorOpeningScreen: FunctionComponent<DoorToDoorTunnelOpeningScreenProp> = ({
  navigation,
  route,
}) => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<DoorToDoorPollConfigDoorStatus[]>
  >(new ViewState.Loading())

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

  const onChoice = (success: boolean) => {
    if (success) {
      navigation.navigate(Screen.tunnelDoorInterlocutor, {
        campaignId: route.params.campaignId,
        buildingParams: route.params.buildingParams,
      })
    } else {
      navigation.goBack()
    }
  }

  const CardItem = ({ onPress, title, image }: CardItemProps) => (
    <View style={styles.card}>
      <TouchablePlatform
        style={styles.cardContent}
        onPress={onPress}
        touchHighlight={Colors.touchHighlight}
      >
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>{title}</Text>
          <Image source={image} />
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
          const image = item.success
            ? require('../../../../assets/images/papDoorOpening.png')
            : require('../../../../assets/images/papDoorNotOpening.png')
          return (
            <CardItem
              key={item.code}
              onPress={() => {
                onChoice(item.success)
              }}
              title={item.label}
              image={image}
            />
          )
        })}
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
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
