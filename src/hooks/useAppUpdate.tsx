import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { checkVersion } from 'react-native-check-version'
import { nativeApplicationVersion } from 'expo-application'
import { isWeb } from 'tamagui'

export default function useAppUpdate() {
  const [isBuildUpdateAvailable, setIsBuildUpdateAvailable] = useState(false)

  const checkForUpdate = () => {
    if (isWeb) {
      return
    }

    const checkStoreUpdate = async () => {
      const version = await checkVersion({
        country: 'fr',
        bundleId: Platform.OS === 'android' ? 'fr.en_marche.jecoute' : 'fr.en-marche.jecoute',
        currentVersion: nativeApplicationVersion ?? '999',
      })

      if (version.needsUpdate) {
        setIsBuildUpdateAvailable(true)
      }
    }
    return checkStoreUpdate()
  }

  useEffect(() => {
    checkForUpdate()
  }, [])

  return {
    isBuildUpdateAvailable,
    checkForUpdate,
  }
}
