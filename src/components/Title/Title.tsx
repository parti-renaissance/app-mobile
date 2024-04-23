import { Text, TextProps } from 'tamagui'

export default function Title({ children, ...rest }: TextProps) {
  return (
    <Text fontWeight="$7" fontSize="$5" {...rest}>
      {children}
    </Text>
  )
}
