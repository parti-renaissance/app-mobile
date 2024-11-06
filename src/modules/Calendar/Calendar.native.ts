import { Platform } from 'react-native'
import { presentEventCreatingDialog } from 'react-native-add-calendar-event'
import * as Permissions from 'react-native-permissions'
import { useToastController } from '@tamagui/toast'
import { UseCreateEvent } from './CalendarTypes'
import { isAllday as getIsAllDay, handleCreateEventError } from './utils'

const useCreateEvent: UseCreateEvent = () => {
  const toast = useToastController()
  return async (event) => {
    const isAllday = getIsAllDay(event)
    return Permissions.request(
      // @ts-expect-error
      Platform.select({
        ios: Permissions.PERMISSIONS.IOS.CALENDARS_WRITE_ONLY,
        android: Permissions.PERMISSIONS.ANDROID.WRITE_CALENDAR,
      }),
    )
      .then((result) => {
        if (result !== Permissions.RESULTS.GRANTED) {
          toast.show("Nous n'avons pas la permission", {
            message: "Activer les permissions pour ajouter un événement au calendrier dans les paramètres de l'application",
          })
        }
        return presentEventCreatingDialog({
          ...event,
          allDay: isAllday,
          startDate: event.startDate ? event.startDate : undefined,
          endDate: !isAllday && event.endDate ? event.endDate : undefined,
        })
      })
      .catch((error) => handleCreateEventError(error, toast))
  }
}

export default useCreateEvent
