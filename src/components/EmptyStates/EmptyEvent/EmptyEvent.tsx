import Text from '@/components/base/Text'
import { Image, View } from 'tamagui'

export default function EmptyEvent() {
  return (
    <View alignSelf="center" alignContent="center" gap="$4">
      <Image source={require('./Assets/magnifyingGlass.png')} width={200} height={200} resizeMode={'contain'} mb="$4" />
      <Text textAlign="center">Aucuns évènements à venir</Text>
    </View>
  )
}
