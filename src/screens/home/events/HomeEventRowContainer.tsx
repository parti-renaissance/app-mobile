import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors, Spacing } from '../../../styles'
import EventView from '../../events/EventView'
import { HomeEventRowContainerViewModel } from '../HomeRowViewModel'

type Props = Readonly<{
  viewModel: HomeEventRowContainerViewModel
  isHighlighted: boolean
  onEventSelected: (eventId: string) => void
}>

export const HomeEventRowContainer: FunctionComponent<Props> = ({
  viewModel,
  isHighlighted,
  onEventSelected,
}) => {
  return (
    <View
      style={[styles.container, isHighlighted && styles.highlightedContainer]}
    >
      <EventView
        viewModel={viewModel.event}
        onEventSelected={onEventSelected}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.margin,
    paddingTop: Spacing.unit,
    paddingBottom: Spacing.margin,
  },
  highlightedContainer: {
    backgroundColor: Colors.highlightedNewsBackground,
    flex: 1,
  },
})
