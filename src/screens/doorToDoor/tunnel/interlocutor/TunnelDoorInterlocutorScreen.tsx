import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  Screen,
  TunnelDoorInterlocutorScreenProp,
} from '../../../../navigation'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../../../styles'
import { ScrollView } from 'react-native-gesture-handler'
import { TouchablePlatform } from '../../../shared/TouchablePlatform'
import i18n from '../../../../utils/i18n'
import DoorToDoorRepository from '../../../../data/DoorToDoorRepository'
import { StatefulView, ViewState } from '../../../shared/StatefulView'
import { DoorToDoorPollConfigResponseStatus } from '../../../../core/entities/DoorToDoorPollConfig'
import { useDoorToDoorTunnelNavigationOptions } from '../DoorToDoorTunnelNavigationHook'
import { ViewStateUtils } from '../../../shared/ViewStateUtils'
import LoadingOverlay from '../../../shared/LoadingOverlay'
import {
  INTERLOCUTOR_ACCEPT_TO_ANSWER_CODE,
  SendDoorPollAnswersInteractor,
} from '../../../../core/interactor/SendDoorPollAnswersInteractor'
import { AlertUtils } from '../../../shared/AlertUtils'

const TunnelDoorInterlocutorScreen: FunctionComponent<TunnelDoorInterlocutorScreenProp> = ({
  route,
  navigation,
}) => {
  const [statefulState, setStatefulState] = useState<
    ViewState<Array<DoorToDoorPollConfigResponseStatus>>
  >(ViewState.Loading())
  const [isSendingChoice, setIsSendingChoice] = useState(false)

  useDoorToDoorTunnelNavigationOptions(navigation)

  useEffect(() => {
    const fetchData = () => {
      DoorToDoorRepository.getInstance()
        .getDoorToDoorPollConfig(route.params.campaignId)
        .then((result) => {
          setStatefulState(ViewState.Content(result.before.responseStatus))
        })
        .catch((error) =>
          setStatefulState(ViewStateUtils.networkError(error, fetchData)),
        )
    }
    fetchData()
  }, [route.params.campaignId])

  const onChoice = (code: string) => {
    if (code === INTERLOCUTOR_ACCEPT_TO_ANSWER_CODE) {
      navigation.navigate(Screen.tunnelDoorPoll, {
        campaignId: route.params.campaignId,
        interlocutorStatus: code,
        buildingParams: route.params.buildingParams,
      })
    } else {
      setIsSendingChoice(true)
      new SendDoorPollAnswersInteractor()
        .execute({
          campaignId: route.params.campaignId,
          doorStatus: code,
          buildingParams: route.params.buildingParams,
        })
        .then(() => {
          if (route.params.buildingParams.type === 'house') {
            navigation.getParent()?.goBack()
          } else {
            navigation.navigate(Screen.tunnelDoorSelectionScreen, {
              campaignId: route.params.campaignId,
              buildingParams: {
                ...route.params.buildingParams,
                door: route.params.buildingParams.door + 1,
              },
              canCloseFloor: true,
            })
          }
        })
        .catch((error) =>
          AlertUtils.showNetworkAlert(error, () => {
            onChoice(code)
          }),
        )
        .finally(() => setIsSendingChoice(false))
    }
  }

  const renderContentItems = (
    items: Array<DoorToDoorPollConfigResponseStatus>,
  ) => {
    return items.map((item, index) => (
      <View
        key={item.code}
        style={[
          styles.itemContainer,
          index === items.length - 1 ? styles.itemContainerExpanded : {},
        ]}
      >
        <TouchablePlatform
          style={styles.itemContent}
          onPress={() => {
            onChoice(item.code)
          }}
          touchHighlight={Colors.touchHighlight}
        >
          <Text style={styles.itemText}>{item.label}</Text>
        </TouchablePlatform>
      </View>
    ))
  }

  const renderContentComponent = (
    items: Array<DoorToDoorPollConfigResponseStatus>,
  ) => (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title} key={'title'}>
        {i18n.t('doorToDoor.tunnel.interlocutor.title')}
      </Text>
      {renderContentItems(items)}
    </ScrollView>
  )

  return (
    <SafeAreaView style={styles.container}>
      <LoadingOverlay visible={isSendingChoice} />
      <StatefulView
        state={statefulState}
        contentComponent={(content) => renderContentComponent(content)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: Spacing.margin,
  },
  exit: {
    color: Colors.primaryColor,
  },
  itemContainer: {
    backgroundColor: Colors.secondaryButtonBackground,
    borderRadius: 40,
    marginBottom: Spacing.margin,
    overflow: 'hidden',
  },
  itemContainerExpanded: {
    flexGrow: 1,
    flex: 1,
  },
  itemContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.margin,
  },
  itemText: {
    ...Typography.callout,
    textAlign: 'center',
  },
  separator: {
    height: Spacing.margin,
  },
  title: {
    ...Typography.title2,
    marginVertical: Spacing.margin,
  },
})

export default TunnelDoorInterlocutorScreen
