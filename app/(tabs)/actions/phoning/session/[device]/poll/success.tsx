import React, { FunctionComponent, useEffect, useState } from 'react'
import { SectionList, StyleSheet, View } from 'react-native'
import { PhoningCampaign } from '@/core/entities/PhoningCampaign'
import PhoningCampaignRepository from '@/data/PhoningCampaignRepository'
import { PhoningSessionModalNavigatorScreenProps } from '@/navigation/phoningSessionModal/PhoningSessionModalNavigatorScreenProps'
import { Colors, Spacing } from '@/styles'
import { PhoningCampaignRankingHeaderView } from '@/screens/shared/PhoningCampaignRankingHeaderView'
import { PhoningCampaignRankingRow } from '@/screens/shared/PhoningCampaignRankingRow'
import { VerticalSpacer } from '@/screens/shared/Spacer'
import { usePreventGoingBack } from '@/screens/shared/usePreventGoingBack.hook'
import { PhonePollDetailSuccessContent } from '@/screens/phonePollDetailSuccess/PhonePollDetailSuccessContent'
import { PhonePollDetailSuccessSectionHeader } from '@/screens/phonePollDetailSuccess/PhonePollDetailSuccessSectionHeader'
import { PhonePollDetailSuccessViewModelMapper } from '@/screens/phonePollDetailSuccess/PhonePollDetailSuccessViewModelMapper'
import { useCampaignStore, useSessionStore } from '@/data/store/phoning'

import {router, useNavigation, useLocalSearchParams} from 'expo-router'

type PhonePollDetailSuccessScreenProps =
    PhoningSessionModalNavigatorScreenProps<'PhonePollDetailSuccess'>

const PhonePollDetailSuccessScreen: FunctionComponent<
    PhonePollDetailSuccessScreenProps
> = () => {
    const { campaign } = useCampaignStore()
    const { session } = useSessionStore()
    const navigation = useNavigation()
    const { device } = useLocalSearchParams<{ device: 'current' | 'external' }>()
    

    usePreventGoingBack()

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: campaign.title,
        })
    }, [navigation, campaign.title])



    const viewModel = PhonePollDetailSuccessViewModelMapper.map(campaign)

    return (
        <View style={styles.container}>
            <SectionList
                sections={viewModel.sections}
                renderItem={({ item }) => {
                    switch (item.type) {
                        case 'successContent':
                            return (
                                <PhonePollDetailSuccessContent
                                    viewModel={item.viewModel}
                                    onNewCall={() => {
                                        // If adherent is null in the param list it means we are in the permanent campaign and should navigate to phoningContactTutorial
                                        if (session.adherent) {
                                            router.replace({
                                                pathname: '/(tabs)/actions/phoning/session/[device]/',
                                                params: { device }
                                            })
                                        } else {
                                            router.replace({
                                                pathname: '/(tabs)/actions/phoning/session/loader-permanent-campaign',
                                                params: { device }
                                            })
                                        }
                                    }}
                                    onFinish={() => {router.navigate({pathname: '/(tabs)/actions/phoning/'})}}
                                />
                            )
                        case 'rankingHeader':
                            return <PhoningCampaignRankingHeaderView />
                        case 'rankingRow':
                            return <PhoningCampaignRankingRow viewModel={item.viewModel} />
                    }
                }}
                stickySectionHeadersEnabled={false}
                renderSectionHeader={({ section: { title } }) => {
                    return <PhonePollDetailSuccessSectionHeader title={title} />
                }}
                ListFooterComponent={() => <VerticalSpacer spacing={Spacing.margin} />}
                keyExtractor={(item, index) => item.type + index}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.defaultBackground,
        flex: 1,
    },
})

export default PhonePollDetailSuccessScreen;
