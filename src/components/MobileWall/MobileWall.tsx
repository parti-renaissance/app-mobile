import { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import Text from '@/components/base/Text'
import redirectToStore from '@/helpers/redirectToStore'
import { Image, View } from 'tamagui'

export default function MobileWall() {
  const redirectToApple = useCallback(() => redirectToStore('ios'), [])
  const redirectToAndroid = useCallback(() => redirectToStore('android'), [])

  return (
    <View height={'100%'} flexDirection={'row'} maxWidth={400} alignSelf={'center'}>
      <View alignSelf={'center'} flex={1} p={'$medium'} gap={'$medium'}>
        <Image height={180} width="auto" resizeMode={'contain'} source={require('./Assets/screenshots.png')} />

        <Text>
          <Text fontWeight={'$7'}>Téléchargez notre application mobile pour accéder aux </Text>
          <Text color={'$green7'}>Actions </Text>
          <Text>et à toutes nos fonctionnalités et services en un seul clic.</Text>
        </Text>

        <View flexDirection={'row'} justifyContent={'center'} gap={'$medium'}>
          <TouchableOpacity onPress={redirectToApple}>
            <Image source={require('./Assets/Apple.png')} resizeMode={'contain'} width={140} height={45} />
          </TouchableOpacity>

          <TouchableOpacity onPress={redirectToAndroid}>
            <Image source={require('./Assets/Google.png')} resizeMode={'contain'} width={140} height={45} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
