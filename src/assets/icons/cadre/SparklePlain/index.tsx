import React, { memo } from 'react'
import type { IconProps } from '@tamagui/helpers-icon'
import { themed } from '@tamagui/helpers-icon'
import { Image } from 'expo-image'

const Icon = (props: { size: number }) => {
  const { size = 24 } = props
  return (
    <Image
      source={require('./SparklePlain.png')}
      style={{
        width: size,
        height: size,
      }}
    />
  )
}

Icon.displayName = 'SparklePlain'

export const SparklePlain = memo<IconProps>(themed(Icon))
