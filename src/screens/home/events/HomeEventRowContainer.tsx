import React, { FunctionComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors, Spacing } from '../../../styles'
import EventView from '../../events/EventView'
import { EventRowViewModel } from '../../events/EventViewModel'
import { HomeEventRowContainerViewModel } from '../HomeRowViewModel'

type Props = Readonly<{
  viewModel: HomeEventRowContainerViewModel
  isHighlighted: boolean
  onEventSelected: (event: EventRowViewModel) => void
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
    paddingBottom: Spacing.unit,
  },
  highlightedContainer: {
    backgroundColor: Colors.highlightedNewsBackground,
    flex: 1,
  },
})
