import { Linking } from 'react-native'
import * as Clipboard from 'expo-clipboard'

export interface RetaliationRequest {
  content: string
  url: string
}

export const RetaliationService = {
  retaliate: async (request: RetaliationRequest) => {
    await Clipboard.setStringAsync(request.content)
    Linking.openURL(request.url)
  },
}
