import React, { FunctionComponent, useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import Markdown from '@ronradtke/react-native-markdown-display'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import { ActionsNavigatorScreenProps } from '../../navigation/actions/ActionsNavigatorScreenProps'
import { Colors, Spacing, Styles, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { AlertUtils } from '../shared/AlertUtils'
import { PrimaryButton } from '../shared/Buttons'

type PhoningCharterScreenProps = ActionsNavigatorScreenProps<'PhoningCharter'>

const PhoningCharterScreen: FunctionComponent<PhoningCharterScreenProps> = ({
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
        navigation.replace('PhoningCampaignBrief', {
          data: route.params.data.brief,
        })
      })
      .catch((error: Error) => {
        AlertUtils.showNetworkAlert(error, undefined)
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.markdownContainer}>
        <Markdown style={Typography.markdownStyle} mergeStyle={false}>
          {route.params.data.charter}
        </Markdown>
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
  markdownContainer: {
    padding: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
})

export default PhoningCharterScreen
