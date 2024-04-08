import type * as AddCalendarEvent from 'react-native-add-calendar-event'
import { useToastController } from '@tamagui/toast'
import { atcb_action } from 'add-to-calendar-button'
import { formatDate } from 'date-fns'

export const useCreateEvent = (event: AddCalendarEvent.CreateOptions) => {
  const toast = useToastController()
  return () =>
    atcb_action({
      name: event.title,
      description: event.notes,
      startDate: formatDate(event.startDate, 'yyyy-MM-dd'),
      endDate: formatDate(event.endDate, 'yyyy-MM-dd'),
      startTime: formatDate(event.startDate, 'HH:mm'),
      endTime: formatDate(event.endDate, 'HH:mm'),
      location: event.location,
      timeZone: 'Europe/Paris',
      language: 'fr',
      options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'MicrosoftTeams', 'Outlook.com', 'Yahoo'],
    }).catch((error: string) => {
      toast.show('Error', {
        message: error,
      })
    })
}
