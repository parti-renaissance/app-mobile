import React, { FunctionComponent } from 'react'
import { Colors } from '../../../styles'
import i18n from '../../../utils/i18n'
import {
  HomeFeedActionCampaignCard,
  HomeFeedActionCampaignCardViewModel,
} from './HomeFeedActionCampaignCard'
import { HomeFeedTimelineItem } from './HomeFeedTimelineItem'

type Props = Readonly<{
  viewModel: HomeFeedActionCampaignCardViewModel
  onPollSelected: (pollId: string) => void
}>

export const HomeFeedPollRow: FunctionComponent<Props> = ({
  viewModel,
  onPollSelected,
}) => {
  return (
    <HomeFeedTimelineItem
      title={i18n.t('home.feed.polls')}
      imageSource={require('../../../assets/images/homeFeedActionIcon.png')}
      tintColor={Colors.homeFeedActionBackground}
    >
      <HomeFeedActionCampaignCard
        viewModel={viewModel}
        icon={require('../../../assets/images/homeFeedPollIcon.png')}
        onPress={() => onPollSelected(viewModel.id)}
      />
    </HomeFeedTimelineItem>
  )
}
