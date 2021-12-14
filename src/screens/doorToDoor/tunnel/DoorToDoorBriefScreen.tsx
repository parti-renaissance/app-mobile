import React, {
  FunctionComponent,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'
import { SafeAreaView, StyleSheet, ScrollView, Text, View } from 'react-native'
import Markdown from 'react-native-markdown-display'
import { Colors, Spacing, Typography } from '../../../styles'
import i18n from '../../../utils/i18n'
import { GenericErrorMapper } from '../../shared/ErrorMapper'
import { StatefulView, ViewState } from '../../shared/StatefulView'
import { useFocusEffect } from '@react-navigation/core'
import { DoorToDoorBriefScreenProp, Screen } from '../../../navigation'
import DoorToDoorRepository from '../../../data/DoorToDoorRepository'
import { PrimaryButton } from '../../shared/Buttons'
import { CloseButton } from '../../shared/NavigationHeaderButton'

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

  const { campaignId, campaignTitle, campaignBrief } = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
      // TODO - to check is title on header on not
      // title: i18n.t('tunnel.tutorial.title'),
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
          new ViewState.Error(GenericErrorMapper.mapErrorMessage(error), () => {
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
          <Text style={styles.title}>{i18n.t('tunnel.tutorial.title')}</Text>
          <Markdown>{resources.content}</Markdown>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <PrimaryButton
            title={i18n.t('tunnel.tutorial.action')}
            onPress={() =>
              navigation.navigate(Screen.doorToDoorTunnelStart, {
                campaignId,
                campaignTitle,
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
