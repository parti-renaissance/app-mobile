import { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import Text from '@/components/base/Text'
import { ProfileCallToActionLayout } from '@/components/ProfileCards/ProfileCallToActionLayout/ProfileCallToActionLayout'
import redirectToStore from '@/helpers/redirectToStore'
import { Image } from 'tamagui'

export interface AppDownloadCTAProps {
  variant?: 'date' | 'screenshots'
}

export default function AppDownloadCTA({ variant = 'date' }: AppDownloadCTAProps) {
  const redirectToApple = useCallback(() => redirectToStore('ios'), [])
  const redirectToAndroid = useCallback(() => redirectToStore('android'), [])

  const isDateVariant = variant === 'date'

  return (
    <ProfileCallToActionLayout>
      <ProfileCallToActionLayout.Image
        source={isDateVariant ? require('./Assets/downloadCTA.png') : require('./Assets/screenshots.png')}
        height={isDateVariant ? 120 : 220}
      />
      <ProfileCallToActionLayout.Content>
        <Text fontWeight={'$7'} textAlign={'center'} mb={isDateVariant ? undefined : '$4'}>
          {isDateVariant
            ? 'Gardez la campagne à portée de main avec l’application mobile.'
            : 'Les Questionnaires et le Porte à porte sont pour le moment réservées à notre application mobile.'}
        </Text>

        {!isDateVariant && (
          <Text fontWeight={'$4'} textAlign={'center'}>
            Téléchargez-là pour profiter de toutes les fonctionnalités !
          </Text>
        )}
      </ProfileCallToActionLayout.Content>
      <ProfileCallToActionLayout.Actions>
        <TouchableOpacity style={{ flex: 1 }} onPress={redirectToApple}>
          <Image source={require('./Assets/Apple.png')} resizeMode={'contain'} width={'100%'} height={45} />
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }} onPress={redirectToAndroid}>
          <Image source={require('./Assets/Google.png')} resizeMode={'contain'} width={'100%'} height={45} />
        </TouchableOpacity>
      </ProfileCallToActionLayout.Actions>
    </ProfileCallToActionLayout>
  )
}
