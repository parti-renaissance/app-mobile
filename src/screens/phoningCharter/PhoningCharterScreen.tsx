import React, { FunctionComponent, useEffect } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import Markdown from 'react-native-markdown-display'
import SafeAreaView from 'react-native-safe-area-view'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import { PhoningCharterScreenProp, Screen } from '../../navigation'
import { Colors, Spacing, Styles } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import { GenericErrorMapper } from '../shared/ErrorMapper'

const PhoningCharterScreen: FunctionComponent<PhoningCharterScreenProp> = ({
  route,
  navigation,
}) => {
  useEffect(() => {
    navigation.setOptions({
      title: i18n.t('phoning.charter.title'),
    })
  })

  const acceptCharter = () => {
    PhoningCampaignRepository.getInstance()
      .acceptPhoningCharter()
      .then(() => {
        navigation.replace(Screen.phoningCampaignBrief, {
          data: route.params.data.brief,
        })
      })
      .catch((error: Error) => {
        displayError(GenericErrorMapper.mapErrorMessage(error))
      })
  }

  const displayError = (error: string) => {
    Alert.alert(
      i18n.t('common.error_title'),
      error,
      [
        {
          text: i18n.t('common.ok'),
          style: 'default',
        },
      ],
      { cancelable: false },
    )
  }

  const markdownStyle = { body: styles.chartContainer }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Markdown style={markdownStyle}>{route.params.data.charter}</Markdown>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <PrimaryButton
          title={i18n.t('phoning.charter.accept')}
          onPress={acceptCharter}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    ...Styles.topElevatedContainerStyle,
    backgroundColor: Colors.defaultBackground,
    padding: Spacing.margin,
  },
  chartContainer: {
    margin: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
})

export default PhoningCharterScreen
