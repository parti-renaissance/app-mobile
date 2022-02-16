import { Platform } from 'react-native'
import { CreateOptions } from 'react-native-add-calendar-event'
import { DetailedEvent } from '../../core/entities/Event'

export const CreateEventOptionsMapper = {
  map: (event: DetailedEvent): CreateOptions => {
    const address = event.address
      ? event.address.address +
        ', ' +
        event.address.postalCode +
        ' ' +
        event.address.city
      : undefined
    return {
      title: event.name,
      startDate: event.dateStart.toISOString(),
      endDate: event.dateEnd.toISOString(),
      url: Platform.select({ ios: event.visioUrl }), // ios only
      location: address,
      notes: Platform.select({ android: event.visioUrl }), // android only
    }
  },
}
