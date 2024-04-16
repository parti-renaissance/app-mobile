import { Text, TextProps } from 'tamagui'

export default function Title({ children, ...rest }: TextProps) {
  return (
    <Text fontFamily="$PublicSans" fontWeight="$7" fontSize="$5" {...rest}>
      {children}
    </Text>
  )
}
