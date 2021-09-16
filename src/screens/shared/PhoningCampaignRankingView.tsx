import React, { FunctionComponent } from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { PhoningCampaignRankingHeaderView } from './PhoningCampaignRankingHeaderView'
import {
  PhoningCampaignRankingRow,
  PhoningScoreboardRowViewModel,
} from './PhoningCampaignRankingRow'

export interface PhoningScoreboardViewModel {
  rows: ReadonlyArray<PhoningScoreboardRowViewModel>
}

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  scrollEnabled?: boolean
  viewModel: PhoningScoreboardViewModel
}>

export const PhoningCampaignRankingView: FunctionComponent<Props> = ({
  style,
  scrollEnabled,
  viewModel,
}) => {
  const renderItem = ({
    item,
  }: ListRenderItemInfo<PhoningScoreboardRowViewModel>) => {
    return <PhoningCampaignRankingRow viewModel={item} />
  }

  return (
    <>
      <PhoningCampaignRankingHeaderView />
      <FlatList
        data={viewModel.rows}
        style={style}
        scrollEnabled={scrollEnabled}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </>
  )
}
