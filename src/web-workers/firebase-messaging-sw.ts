import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging/sw'
import config from '@/config/firebaseWebConfig'

const firebaseApp = initializeApp(config)

const messaging = getMessaging(firebaseApp)
