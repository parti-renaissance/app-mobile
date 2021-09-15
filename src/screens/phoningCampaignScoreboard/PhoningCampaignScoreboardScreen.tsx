import React, { FunctionComponent, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoningCampaignScore } from '../../core/entities/PhoningCampaign'
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

  const map = (scores: Array<PhoningCampaignScore>) => {
    return {
      rows: scores.map((item) => {
        return {
          id: `${item.position}_${item.firstName}_${item.calls}_${item.surveys}`,
          name: i18n.t('phoning.scoreboard.name', {
            position: item.position,
            name: item.firstName,
          }),
          position: item.position,
          caller: item.caller,
          calls: item.calls,
          surveys: item.surveys,
        }
      }),
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <PhoningCampaignRankingView
        viewModel={map(route.params.data.scoreboard)}
      />
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
