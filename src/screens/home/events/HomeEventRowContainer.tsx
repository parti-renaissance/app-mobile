import React, { FunctionComponent } from 'react'
import EventView from '../../events/EventView'
import { HomeEventRowContainerViewModel } from '../HomeRowViewModel'

type Props = Readonly<{
  viewModel: HomeEventRowContainerViewModel
  onEventSelected: (eventId: string) => void
}>

export const HomeEventRowContainer: FunctionComponent<Props> = ({
  viewModel,
  onEventSelected,
}) => {
  return (
    <EventView viewModel={viewModel.event} onEventSelected={onEventSelected} />
  )
}
