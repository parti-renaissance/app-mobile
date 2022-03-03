import Clipboard from '@react-native-community/clipboard'
import { Linking } from 'react-native'

export interface RetaliationRequest {
  content: string
  url: string
}

export const RetaliationService = {
  retaliate: (request: RetaliationRequest) => {
    Clipboard.setString(request.content)
    Linking.openURL(request.url)
  },
}
