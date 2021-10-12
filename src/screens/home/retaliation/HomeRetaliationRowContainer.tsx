import React, { FunctionComponent, useState } from 'react'
import { HomeRetaliationRowContainerViewModel } from '../HomeRowViewModel'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Dimensions, ListRenderItemInfo, StyleSheet } from 'react-native'
import { Spacing, Colors } from '../../../styles'
import { HomeRetaliationCardViewModel } from './HomeRetaliationCardViewModel'
import HomeRetaliationCard from './HomeRetaliationCard'

type Props = Readonly<{
  viewModel: HomeRetaliationRowContainerViewModel
  onRetaliationSelected: (id: string) => void
  onRetaliateSelected: (id: string) => void
}>
export const HomeRetaliationRowContainer: FunctionComponent<Props> = ({
  viewModel,
  onRetaliationSelected,
  onRetaliateSelected,
}) => {
  const [currentItem, setCurrentItem] = useState(0)
  const width = Dimensions.get('window').width
  return (
    <>
      <Carousel
        layout={'default'}
        scrollEnabled={viewModel.retaliations.length > 1}
        data={viewModel.retaliations}
        sliderWidth={width}
        itemWidth={width - Spacing.margin * 2}
        renderItem={(
          model: ListRenderItemInfo<HomeRetaliationCardViewModel>,
        ) => {
          return (
            <HomeRetaliationCard
              viewModel={model.item}
              onRetaliationSelected={onRetaliationSelected}
              onRetaliateSelected={onRetaliateSelected}
            />
          )
        }}
        onSnapToItem={(index) => setCurrentItem(index)}
      />
      <Pagination
        dotsLength={viewModel.retaliations.length}
        activeDotIndex={currentItem}
        dotStyle={styles.paginationDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </>
  )
}

const DOT_SIZE = 10
const styles = StyleSheet.create({
  paginationDotStyle: {
    backgroundColor: Colors.shipGray,
    borderRadius: DOT_SIZE / 2,
    height: DOT_SIZE,
    width: DOT_SIZE,
  },
})
