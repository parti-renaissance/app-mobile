import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useRef } from 'react'

export const useRefreshOnFocus = <T>(refetch: () => Promise<T>) => {
  const enabledRef = useRef(false)

  useFocusEffect(
    useCallback(() => {
      if (enabledRef.current) {
        refetch()
      } else {
        enabledRef.current = true
      }
    }, [refetch]),
  )
}
