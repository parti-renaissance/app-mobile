import { useToastController } from '@tamagui/toast'
import { UseCreateEvent } from './CalendarTypes'

const useCreateEvent: UseCreateEvent = () => {
  const toast = useToastController()
  return async (event) => {
    toast.show('!!!', {
      message: 'NOT IMPLEMENTED YET',
    })
    // return placeholderPromise

    return new Promise((resolve, reject) => {
      resolve('lol')
    })
  }
}
export default useCreateEvent
