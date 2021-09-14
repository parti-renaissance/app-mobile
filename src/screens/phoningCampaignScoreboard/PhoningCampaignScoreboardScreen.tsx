import React, { FunctionComponent, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoningCampaignScoreboardScreenProp } from '../../navigation'
import { Colors, Spacing } from '../../styles'
import i18n from '../../utils/i18n'
import PhoningCampaignRankingView from '../shared/PhoningCampaignRankingView'

const PhoningCampaignScoreboardScreen: FunctionComponent<PhoningCampaignScoreboardScreenProp> = ({
  navigation,
  route,
}) => {
  useEffect(() => {
    navigation.setOptions({
      title: i18n.t('phoning.scoreboard.title'),
    })
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <PhoningCampaignRankingView scores={route.params.data.scoreboard} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
    padding: Spacing.margin,
  },
})

export default PhoningCampaignScoreboardScreen
