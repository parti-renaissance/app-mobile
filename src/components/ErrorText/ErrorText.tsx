import React from 'react'
import { AlertCircle } from '@tamagui/lucide-icons'
import { Text, View, ViewProps } from 'tamagui'

export default function ErrorText({ children, ...rest }: ViewProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }} gap={4} {...rest}>
      <AlertCircle size={16} color={'$red6'} />

      <Text color="$gray6" fontSize={'$1'}>
        {children}
      </Text>
    </View>
  )
}
