import Text from '@/components/base/Text'
import { View } from 'tamagui'

export interface TagProps {
  color?: string
  bgColor?: string
  label?: string
}

export default function Tag({ color, bgColor, label }: TagProps) {
  return (
    <View borderRadius={'$2'} backgroundColor={bgColor} paddingHorizontal={'$2'} paddingVertical={'$1'}>
      <Text width={'unset'} color={color}>
        {label}
      </Text>
    </View>
  )
}
