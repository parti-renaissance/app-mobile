import Text from '@/components/base/Text'
import { Image, View } from 'tamagui'

export default function EmptyState(props: { state: string }) {
  return (
    <View alignSelf="center" alignContent="center" gap="$medium">
      <Image source={require('./Assets/magnifyingGlass.png')} width={200} height={200} resizeMode={'contain'} mb="$medium" />
      <Text textAlign="center">Aucuns {props.state} à venir</Text>
    </View>
  )
}
