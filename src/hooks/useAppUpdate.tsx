import { useEffect, useState } from 'react'
import { checkVersion } from 'react-native-check-version'
import { isWeb } from 'tamagui'

export default function useAppUpdate() {
  // const updates = useUpdates()
  const [isBuildUpdateAvailable, setIsBuildUpdateAvailable] = useState(false)

  const checkForUpdate = () => {
    if (isWeb) {
      return
    }

    const checkStoreUpdate = async () => {
      const version = await checkVersion({
        country: 'fr',
      })

      if (version.needsUpdate) {
        setIsBuildUpdateAvailable(true)
      }
    }
    return checkStoreUpdate()
  }

  //   const checkExpoUpdate = async () => {
  //     try {
  //       const update = await checkForUpdateAsync()

  //       if (update.isAvailable) {
  //         await fetchUpdateAsync()
  //       }
  //     } catch (error) {}
  //   }

  //   return Promise.allSettled([checkExpoUpdate(), checkStoreUpdate()])
  // }

  useEffect(() => {
    checkForUpdate()
  }, [])

  return {
    isBuildUpdateAvailable,
    checkForUpdate,
    // ...updates,
  }
}
