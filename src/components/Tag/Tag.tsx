import { Text } from 'tamagui'

export interface TagProps {
  color?: string
  bgColor?: string
  label?: string
}

export default function Tag({ color, bgColor, label }: TagProps) {
  return (
    <Text color={color} backgroundColor={bgColor} paddingHorizontal={'$2'} paddingVertical={'$1'} borderRadius={'$2'} width={100}>
      {label}
    </Text>
  )
}
