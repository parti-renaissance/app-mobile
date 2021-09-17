import React, { FunctionComponent, useEffect, useState } from 'react'
import { StyleSheet, SectionList } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoningCampaign } from '../../core/entities/PhoningCampaign'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import { PhonePollDetailSuccessScreenProps, Screen } from '../../navigation'
import { Colors, Spacing } from '../../styles'
import { PhoningCampaignRankingHeaderView } from '../shared/PhoningCampaignRankingHeaderView'
import { PhoningCampaignRankingRow } from '../shared/PhoningCampaignRankingRow'
import { VerticalSpacer } from '../shared/Spacer'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'
import { PhonePollDetailSuccessContent } from './PhonePollDetailSuccessContent'
import { PhonePollDetailSuccessSectionHeader } from './PhonePollDetailSuccessSectionHeader'
import { PhonePollDetailSuccessViewModelMapper } from './PhonePollDetailSuccessViewModelMapper'

const PhonePollDetailSuccessScreen: FunctionComponent<PhonePollDetailSuccessScreenProps> = ({
  navigation,
  route,
}) => {
  const [currentCampaign, setCampaign] = useState<PhoningCampaign>()

  usePreventGoingBack()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    })
  }, [navigation, route.params.title])

  useEffect(() => {
    PhoningCampaignRepository.getInstance()
      .getPhoningCampaign(route.params.data.campaignId)
      .then(setCampaign)
      .catch(() => {
        // we don't care about a failure here
      })
  }, [route.params.data.campaignId])

  const viewModel = PhonePollDetailSuccessViewModelMapper.map(currentCampaign)

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={viewModel.sections}
        renderItem={({ item }) => {
          switch (item.type) {
            case 'successContent':
              return (
                <PhonePollDetailSuccessContent
                  viewModel={item.viewModel}
                  onNewCall={() =>
                    navigation.replace(Screen.phoningSessionLoader, {
                      campaignId: route.params.data.campaignId,
                      campaignTitle: route.params.data.campaignTitle,
                      device: route.params.data.device,
                    })
                  }
                  onFinish={() => navigation.pop()}
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
})

export default PhonePollDetailSuccessScreen
