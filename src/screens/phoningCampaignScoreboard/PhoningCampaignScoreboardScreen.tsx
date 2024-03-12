import React, { FunctionComponent, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { ActionsNavigatorScreenProps } from '../../navigation/actions/ActionsNavigatorScreenProps'
import { Colors, Spacing } from '../../styles'
import i18n from '../../utils/i18n'
import { PhoningCampaignRankingView } from '../shared/PhoningCampaignRankingView'
import { PhoningScoreboardRowViewModelMapper } from './PhoningScoreboardRowViewModelMapper'

type PhoningCampaignScoreboardScreenProps =
  ActionsNavigatorScreenProps<'PhoningCampaignScoreboard'>

const PhoningCampaignScoreboardScreen: FunctionComponent<
  PhoningCampaignScoreboardScreenProps
> = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      title: i18n.t('phoning.scoreboard.title'),
    })
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <PhoningCampaignRankingView
        viewModel={PhoningScoreboardRowViewModelMapper.map(
          route.params.data.scoreboard,
        )}
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