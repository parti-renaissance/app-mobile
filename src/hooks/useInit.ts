import { useEffect } from 'react'
import { useSession } from '@/ctx/SessionProvider'
import PushRepository from '@/data/PushRepository'
import { useMatomo } from '@/services/matomo/hook'
import { PushNotification } from '@/utils/PushNotification'
import { SendDoorToDoorPollAnswersJobWorker } from '@/workers/SendDoorToDoorPollAnswsersJobWorker'
import { usePathname } from 'expo-router'

PushNotification.setUp()

const subscribeNotification = async () => {
  const pushRepository = PushRepository.getInstance()
  await PushNotification.requestPermission()
  await pushRepository.synchronizePushTokenAssociation()
}

export default function useInitPushNotification() {
  const { session } = useSession()
  const pathname = usePathname()
  const matomo = useMatomo()

  useEffect(() => {
    matomo.trackAppStart()
  }, [])

  useEffect(() => {
    if (session) {
      SendDoorToDoorPollAnswersJobWorker.getInstance().then((worker) => {
        worker.start()
      })
      subscribeNotification().catch((error) => {
        console.error('Failed to subscribe to notifications', error)
      })
    }
  }, [session])

  useEffect(() => {
    matomo.trackScreenView({ pathname })
  }, [pathname])
}
