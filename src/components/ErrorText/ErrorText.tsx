import React from 'react'
import { Text, TextProps } from 'tamagui'

export default function ErrorText({ children, ...rest }: TextProps) {
  return (
    <Text color={'$textDanger'} fontSize={'$1'} {...rest}>
      {children}
    </Text>
  )
}
