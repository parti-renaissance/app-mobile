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
  onDoorToDoorCampaignsSelected: () => void
}>

export const HomeFeedDoorToDoorCampaignsRow: FunctionComponent<Props> = ({
  viewModel,
  onDoorToDoorCampaignsSelected,
}) => {
  return (
    <HomeFeedTimelineItem
      title={i18n.t('home.feed.doorToDoorCampaigns')}
      imageSource={require('../../../assets/images/homeFeedActionIcon.png')}
      tintColor={Colors.homeFeedActionBackground}
    >
      <HomeFeedActionCampaignsCard
        viewModel={viewModel}
        onPress={onDoorToDoorCampaignsSelected}
      />
    </HomeFeedTimelineItem>
  )
}
