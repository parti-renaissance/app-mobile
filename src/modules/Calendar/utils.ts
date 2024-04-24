import { Platform } from 'react-native'
import type * as AddCalendarEvent from 'react-native-add-calendar-event'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { useToastController } from '@tamagui/toast'
import { isSameHour } from 'date-fns'

export const isAllday = (event: AddCalendarEvent.CreateOptions) =>
  (event.startDate && event.endDate && isSameHour(event.startDate, event.endDate)) || !event.endDate

export const handleCreateEventError = (error: any, toast: ReturnType<typeof useToastController>) => {
  if (error instanceof Error) {
    ErrorMonitor.log(`${Platform.OS}: error while creating event`, { error })
  }
  toast.show('Error', {
    message: "Nous n'avons pas pu ajouter l'événement au calendrier",
  })
}
