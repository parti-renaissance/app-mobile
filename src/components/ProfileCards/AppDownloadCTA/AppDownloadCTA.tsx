import { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import CountrySelect from '@/components/CountrySelect/CountrySelect'
import { ProfileCallToActionLayout } from '@/components/ProfileCards/ProfileCallToActionLayout/ProfileCallToActionLayout'
import redirectToStore from '@/helpers/redirectToStore'
import { Image } from 'tamagui'

export default function AppDownloadCTA() {
  const redirectToApple = useCallback(() => redirectToStore('ios'), [])
  const redirectToAndroid = useCallback(() => redirectToStore('android'), [])

  return (
    <ProfileCallToActionLayout>
      <ProfileCallToActionLayout.Image source={require('./Assets/downloadCTA.png')} height={120} />
      <ProfileCallToActionLayout.Content content={'Gardez la campagne à portée de main avec l’application mobile.'} textAlign={'center'} />
      <ProfileCallToActionLayout.Actions>
        <TouchableOpacity style={{ flex: 1 }} onPress={redirectToApple}>
          <Image source={require('./Assets/Apple.png')} resizeMode={'contain'} width={'100%'} height={45} />
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }} onPress={redirectToAndroid}>
          <Image source={require('./Assets/Google.png')} resizeMode={'contain'} width={'100%'} height={45} />
        </TouchableOpacity>
      </ProfileCallToActionLayout.Actions>

      <CountrySelect value={'FR'} onChange={console.log} />
    </ProfileCallToActionLayout>
  )
}
