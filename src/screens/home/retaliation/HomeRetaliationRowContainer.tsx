import React, { FunctionComponent, useState } from 'react'
import { HomeRetaliationRowContainerViewModel } from '../HomeRowViewModel'
import RetaliationCard from './RetaliationCard'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Dimensions, ListRenderItemInfo } from 'react-native'
import { Spacing, Colors } from '../../../styles'
import { RetaliationCardViewModel } from './RetaliationCardViewModel'

type Props = Readonly<{
  viewModel: HomeRetaliationRowContainerViewModel
}>
export const HomeRetaliationRowContainer: FunctionComponent<Props> = ({
  viewModel,
}) => {
  const [currentItem, setCurrentItem] = useState(0)
  const width = Dimensions.get('window').width
  return (
    <>
      <Carousel
        layout={'default'}
        data={viewModel.retaliations}
        sliderWidth={width}
        itemWidth={width - Spacing.margin * 2}
        itemHeight={280}
        renderItem={(model: ListRenderItemInfo<RetaliationCardViewModel>) => {
          return <RetaliationCard viewModel={model.item} />
        }}
        onSnapToItem={(index) => setCurrentItem(index)}
      />
      <Pagination
        dotsLength={viewModel.retaliations.length}
        activeDotIndex={currentItem}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: Colors.shipGray,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </>
  )
}
