import { Platform } from 'react-native'
import * as AddCalendarEvent from 'react-native-add-calendar-event'
import * as Permissions from 'react-native-permissions'
import { useToastController } from '@tamagui/toast'

export const useCreateEvent = (event: AddCalendarEvent.CreateOptions) => {
  const toast = useToastController()
  return () =>
    Permissions.request(
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
        return AddCalendarEvent.presentEventCreatingDialog(event)
      })
      .catch((error: string) => {
        toast.show('Error', {
          message: error,
        })
      })
}
