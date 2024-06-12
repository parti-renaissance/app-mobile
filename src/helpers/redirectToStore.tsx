import { Alert, Linking, Platform } from 'react-native'
import { ErrorMonitor } from '@/utils/ErrorMonitor'

export default async function redirectToStore(wantedPlatform?: 'ios' | 'android') {
  const platform = wantedPlatform ?? Platform.OS
  const platformLink = platform === 'ios' ? 'https://apps.apple.com/fr/app/id1441973895' : 'https://play.google.com/store/apps/details?id=fr.en_marche.jecoute'

  try {
    if (await Linking.canOpenURL(platformLink)) {
      await Linking.openURL(platformLink)
    } else {
      Alert.alert('Impossible de rediriger vers le magasin d’application de votre plateforme.')
    }
  } catch (e) {
    ErrorMonitor.log(e)
  }
}
