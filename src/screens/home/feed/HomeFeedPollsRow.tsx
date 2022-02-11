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
  onPollsSelected: () => void
}>

export const HomeFeedPollsRow: FunctionComponent<Props> = ({
  viewModel,
  onPollsSelected,
}) => {
  return (
    <HomeFeedTimelineItem
      title={i18n.t('home.feed.polls')}
      imageSource={require('../../../assets/images/homeFeedActionIcon.png')}
      tintColor={Colors.homeFeedActionBackground}
    >
      <HomeFeedActionCampaignsCard
        viewModel={viewModel}
        onPress={onPollsSelected}
      />
    </HomeFeedTimelineItem>
  )
}
