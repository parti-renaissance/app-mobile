import Text from '@/components/base/Text'
import { Image, View, XStack } from 'tamagui'

export default function EmptyState(props: { state: string }) {
  return (
    <View alignSelf="center" alignContent="center" gap="$large" alignItems={'center'} justifyContent="center" flex={1}>
      <XStack width="100%" maxWidth={342}>
        <Image
          source={require('@/assets/images/empty_card_state.png')}
          width="100%"
          mb="$medium"
          resizeMode="contain"
          justifyContent="center"
          alignSelf="center"
        />
      </XStack>
      <Text semibold textAlign="center">
        Aucune action disponible
      </Text>
    </View>
  )
}
