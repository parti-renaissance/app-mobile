import React, { FC } from 'react'
import { Text } from 'react-native'
import { InterestViewModel } from './CentersOfInterestViewModel'

type Props = Readonly<{
  viewModel: InterestViewModel
}>

const InterestView: FC<Props> = ({ viewModel }) => {
  return <Text>{viewModel.label}</Text>
}

export default InterestView
