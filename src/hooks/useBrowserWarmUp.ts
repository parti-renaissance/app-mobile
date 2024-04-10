import { useEffect } from 'react'
import { Platform } from 'react-native'
import * as WebBrowser from 'expo-web-browser'

const useBrowserWarmUp = () => {
  if (Platform.OS === 'web') return
  useEffect(() => {
    WebBrowser.warmUpAsync()
    return () => {
      WebBrowser.coolDownAsync()
    }
  })
}

export default useBrowserWarmUp
