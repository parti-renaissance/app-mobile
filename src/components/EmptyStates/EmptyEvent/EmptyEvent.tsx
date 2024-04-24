import { Image, Text, View } from 'tamagui'

export default function EmptyEvent() {
  return (
    <View alignSelf="center" alignContent="center">
      <Image source={require('./Assets/magnifyingGlass.png')} width={200} height={200} resizeMode={'contain'} mb="$4" />
      <Text textAlign="center" color="$gray6">
        Aucuns évènements à venir
      </Text>
    </View>
  )
}
