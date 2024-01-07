import { Linking } from 'react-native'
import Clipboard from 'expo-clipboard'

export interface RetaliationRequest {
  content: string
  url: string
}

export const RetaliationService = {
  retaliate: (request: RetaliationRequest) => {
    Clipboard.setStringAsync(request.content)
    Linking.openURL(request.url)
  },
}
