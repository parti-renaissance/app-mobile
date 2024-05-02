import Text from '@/components/base/Text'

export interface TagProps {
  color?: string
  bgColor?: string
  label?: string
}

export default function Tag({ color, bgColor, label }: TagProps) {
  return (
    <Text width={'unset'} color={color} backgroundColor={bgColor} paddingHorizontal={'$2'} paddingVertical={'$1'} borderRadius={'$2'}>
      {label}
    </Text>
  )
}
