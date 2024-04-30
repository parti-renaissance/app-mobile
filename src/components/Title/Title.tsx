import { TextProps } from 'tamagui'
import Text from '../base/Text'

export default function Title({ children, ...rest }: TextProps) {
  return (
    <Text fontWeight="$7" fontSize="$5" {...rest}>
      {children}
    </Text>
  )
}
