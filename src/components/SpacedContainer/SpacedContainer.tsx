import { PropsWithChildren } from 'react'
import { View, ViewProps } from 'tamagui'

/**
 * A simple view with bottom spacing which deduplicate code
 * @param children
 * @constructor
 */
export default function SpacedContainer({ children, ...rest }: PropsWithChildren & ViewProps) {
  return (
    <View paddingBottom={'$4'} {...rest}>
      {children}
    </View>
  )
}
