import React, { FunctionComponent } from 'react'
import { Colors } from '../../../styles'
import i18n from '../../../utils/i18n'
import NewsCard from '../../news/NewsCard'
import { NewsRowViewModel } from '../../news/NewsRowViewModel'
import { HomeFeedTimelineItem } from './HomeFeedTimelineItem'

type Props = Readonly<{
  viewModel: NewsRowViewModel
  onNewsSelected: (newsId: string) => void
}>

export const HomeFeedNewsRow: FunctionComponent<Props> = ({
  viewModel,
  onNewsSelected,
}) => {
  return (
    <HomeFeedTimelineItem
      title={i18n.t('home.feed.news')}
      imageSource={require('../../../assets/images/homeFeedEventIcon.png')}
      tintColor={Colors.homeFeedEventBackground}
    >
      <NewsCard
        viewModel={viewModel}
        onPress={() => onNewsSelected(viewModel.id)}
      />
    </HomeFeedTimelineItem>
  )
}
