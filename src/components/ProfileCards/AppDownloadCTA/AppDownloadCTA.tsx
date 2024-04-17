import { useCallback } from 'react'
import { Touchable, TouchableOpacity } from 'react-native'
import AuthButton from '@/components/Buttons/AuthButton'
import { ProfileCallToAction } from '@/components/ProfileCards/ProfileCallToAction/ProfileCallToAction'
import redirectToStore from '@/helpers/redirectToStore'
import { Image, View } from 'tamagui'

export default function AppDownloadCTA() {
  const redirectToApple = useCallback(() => redirectToStore('ios'), [])
  const redirectToAndroid = useCallback(() => redirectToStore('android'), [])

  return (
    <ProfileCallToAction>
      <ProfileCallToAction.Image source={require('./Assets/downloadCTA.png')} height={120} />
      <ProfileCallToAction.Content content={'Gardez la campagne à portée de main avec l’application mobile.'} textAlign={'center'} />
      <ProfileCallToAction.Actions>
        <TouchableOpacity style={{ flex: 1 }} onPress={redirectToApple}>
          <Image source={require('./Assets/Apple.png')} resizeMode={'contain'} width={'100%'} height={45} />
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }} onPress={redirectToAndroid}>
          <Image source={require('./Assets/Google.png')} resizeMode={'contain'} width={'100%'} height={45} />
        </TouchableOpacity>
      </ProfileCallToAction.Actions>
    </ProfileCallToAction>
  )
}
