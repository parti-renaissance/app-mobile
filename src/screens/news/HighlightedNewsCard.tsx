import React, { FunctionComponent } from 'react'
import NewsCard from './NewsCard'
import { NewsRowViewModel } from './NewsRowViewModel'

type Props = Readonly<{
  viewModel: NewsRowViewModel
  onPress: () => void
}>

const HighlightedNewsCard: FunctionComponent<Props> = ({
  viewModel,
  onPress,
}) => {
  return (
    <NewsCard
      viewModel={viewModel}
      onPress={onPress}
      trailingIcon={require('../../assets/images/highlightedNewsIcon.png')}
    />
  )
}

export default HighlightedNewsCard
