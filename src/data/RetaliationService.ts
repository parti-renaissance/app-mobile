import { Retaliation } from './../core/entities/Retaliation'
import Clipboard from '@react-native-community/clipboard'
import { Linking } from 'react-native'

export const RetaliationService = {
  retaliate: (retaliation: Retaliation) => {
    Clipboard.setString(retaliation.body)
    Linking.openURL(retaliation.sourceUrl)
  },
}
