import React, {
  FunctionComponent,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'
import { SafeAreaView, StyleSheet, ScrollView, Text, View } from 'react-native'
import Markdown from 'react-native-markdown-display'
import { Colors, Spacing, Typography } from '../../../../styles'
import i18n from '../../../../utils/i18n'
import { StatefulView, ViewState } from '../../../shared/StatefulView'
import { useFocusEffect } from '@react-navigation/core'
import { DoorToDoorBriefScreenProp, Screen } from '../../../../navigation'
import DoorToDoorRepository from '../../../../data/DoorToDoorRepository'
import { PrimaryButton } from '../../../shared/Buttons'
import { CloseButton } from '../../../shared/NavigationHeaderButton'
import { ViewStateUtils } from '../../../shared/ViewStateUtils'

export interface TutorialResources {
  content: string
}

const DoorToDoorBriefScreen: FunctionComponent<DoorToDoorBriefScreenProp> = ({
  navigation,
  route,
}) => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<TutorialResources>
  >(new ViewState.Loading())

  const campaignId = route.params.campaignId

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
    })
  }, [navigation])

  const fetchData = useCallback(() => {
    setStatefulState(new ViewState.Loading())
    DoorToDoorRepository.getInstance()
      .getDoorToDoorTutorial()
      .then((markdown) => {
        setStatefulState(new ViewState.Content({ content: markdown }))
      })
      .catch((error) => {
        setStatefulState(
          ViewStateUtils.networkError(error, () => {
            setStatefulState(new ViewState.Loading())
            fetchData()
          }),
        )
      })
  }, [])

  useFocusEffect(fetchData)

  const TutorialContent = (resources: TutorialResources) => {
    return (
      <>
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.title}>
            {i18n.t('doorToDoor.tunnel.tutorial.title')}
          </Text>
          <Markdown>{resources.content}</Markdown>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <PrimaryButton
            title={i18n.t('doorToDoor.tunnel.tutorial.action')}
            onPress={() =>
              navigation.navigate(Screen.tunnelDoorSelectionScreen, {
                campaignId: campaignId,
                buildingParams: route.params.buildingParams,
              })
            }
          />
        </View>
      </>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatefulView contentComponent={TutorialContent} state={statefulState} />
    </SafeAreaView>
  )
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
    ...Typography.title,
  },
})

export default DoorToDoorBriefScreen
