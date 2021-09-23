import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { BackHandler } from 'react-native'

export const useBackHandler = (handler: () => void) => {
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          handler()
          return true
        },
      )

      return () => backHandler.remove()
    }, [handler]),
  )
}
