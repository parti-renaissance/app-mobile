import React, {
  FunctionComponent,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import Markdown from 'react-native-markdown-display'
import { Colors, Spacing, Typography } from '../../../../styles'
import i18n from '../../../../utils/i18n'
import { StatefulView, ViewState } from '../../../shared/StatefulView'
import { useFocusEffect } from '@react-navigation/core'
import { Screen } from '../../../../navigation'
import DoorToDoorRepository from '../../../../data/DoorToDoorRepository'
import { PrimaryButton } from '../../../shared/Buttons'
import { CloseButton } from '../../../shared/NavigationHeaderButton'
import { ViewStateUtils } from '../../../shared/ViewStateUtils'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DoorToDoorTunnelModalNavigatorScreenProps } from '../../../../navigation/DoorToDoorTunnelModalNavigator'

type DoorToDoorBriefScreenProps = DoorToDoorTunnelModalNavigatorScreenProps<'TunnelDoorBriefScreen'>

export interface TutorialResources {
  content: string
}

const DoorToDoorBriefScreen: FunctionComponent<DoorToDoorBriefScreenProps> = ({
  navigation,
  route,
}) => {
  const [statefulState, setStatefulState] = useState<
    ViewState<TutorialResources>
  >(ViewState.Loading())

  const campaignId = route.params.campaignId

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
    })
  }, [navigation])

  const fetchData = useCallback(() => {
    setStatefulState(ViewState.Loading())
    DoorToDoorRepository.getInstance()
      .getCampaign(route.params.campaignId)
      .then((campaign) => {
        setStatefulState(ViewState.Content({ content: campaign.brief }))
      })
      .catch((error) => {
        setStatefulState(
          ViewStateUtils.networkError(error, () => {
            setStatefulState(ViewState.Loading())
            fetchData()
          }),
        )
      })
  }, [route.params.campaignId])

  useFocusEffect(fetchData)

  const TutorialContent = (resources: TutorialResources) => {
    return (
      <>
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.title}>
            {i18n.t('doorToDoor.tunnel.door.tutorial.title')}
          </Text>
          <Markdown style={markdownStyle}>{resources.content}</Markdown>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <PrimaryButton
            title={i18n.t('doorToDoor.tunnel.door.tutorial.action')}
            onPress={() => {
              if (route.params.buildingParams.type === 'house') {
                navigation.navigate(Screen.tunnelDoorOpening, {
                  campaignId: campaignId,
                  buildingParams: route.params.buildingParams,
                })
              } else {
                navigation.navigate(Screen.tunnelDoorSelectionScreen, {
                  campaignId: campaignId,
                  buildingParams: route.params.buildingParams,
                  canCloseFloor: route.params.canCloseFloor,
                })
              }
            }}
          />
        </View>
      </>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatefulView contentComponent={TutorialContent} state={statefulState} />
    </SafeAreaView>
  )
}

const markdownStyle = {
  body: Typography.body,
}

const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: Colors.defaultBackground,
    paddingHorizontal: Spacing.margin,
    padding: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.margin,
  },
  title: {
    ...Typography.largeTitle,
  },
})

export default DoorToDoorBriefScreen
