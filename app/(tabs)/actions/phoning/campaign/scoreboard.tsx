import React, { FunctionComponent, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActionsNavigatorScreenProps } from '@/navigation/actions/ActionsNavigatorScreenProps'
import { Colors, Spacing } from '@/styles'
import i18n from '@/utils/i18n'
import { PhoningCampaignRankingView } from '@/screens/shared/PhoningCampaignRankingView'
import { PhoningScoreboardRowViewModelMapper } from '@/screens/phoningCampaignScoreboard/PhoningScoreboardRowViewModelMapper'
import {router, useLocalSearchParams, useNavigation} from 'expo-router'
import{ useCampaignStore } from '@/data/store/phoning'

type PhoningCampaignScoreboardScreenProps =
    ActionsNavigatorScreenProps<'PhoningCampaignScoreboard'>

const PhoningCampaignScoreboardScreen: FunctionComponent<
    PhoningCampaignScoreboardScreenProps
> = () => {
    const navigation = useNavigation()
    const { campaign } = useCampaignStore()
    
    useEffect(() => {
        navigation.setOptions({
            title: i18n.t('phoning.scoreboard.title'),
        })
    }, [navigation])

    return (
        <SafeAreaView style={styles.container}>
            <PhoningCampaignRankingView
                viewModel={PhoningScoreboardRowViewModelMapper.map(
                    campaign.scoreboard,
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
