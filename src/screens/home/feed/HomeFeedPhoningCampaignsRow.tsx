import React, { FunctionComponent } from 'react'
import { Colors } from '../../../styles'
import i18n from '../../../utils/i18n'
import {
  HomeFeedActionCampaignsCard,
  HomeFeedActionCampaignsCardViewModel,
} from './HomeFeedActionCampaignsCard'
import { HomeFeedTimelineItem } from './HomeFeedTimelineItem'

type Props = Readonly<{
  viewModel: HomeFeedActionCampaignsCardViewModel
  onPhoningCampaignsSelected: () => void
}>

export const HomeFeedPhoningCampaignsRow: FunctionComponent<Props> = ({
  viewModel,
  onPhoningCampaignsSelected,
}) => {
  return (
    <HomeFeedTimelineItem
      title={i18n.t('home.feed.phoningCampaigns')}
      imageSource={require('../../../assets/images/homeFeedActionIcon.png')}
      tintColor={Colors.homeFeedActionBackground}
    >
      <HomeFeedActionCampaignsCard
        viewModel={viewModel}
        onPress={onPhoningCampaignsSelected}
      />
    </HomeFeedTimelineItem>
  )
}
