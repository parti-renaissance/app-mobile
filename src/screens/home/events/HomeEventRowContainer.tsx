import React, { FunctionComponent } from 'react'
import EventView from '../../events/EventView'
import { EventRowViewModel } from '../../events/EventViewModel'
import { HomeEventRowContainerViewModel } from '../HomeRowViewModel'

type Props = Readonly<{
  viewModel: HomeEventRowContainerViewModel
  onEventSelected: (event: EventRowViewModel) => void
}>

export const HomeEventRowContainer: FunctionComponent<Props> = ({
  viewModel,
  onEventSelected,
}) => {
  return (
    <EventView viewModel={viewModel.event} onEventSelected={onEventSelected} />
  )
}
