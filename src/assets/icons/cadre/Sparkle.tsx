import React, { memo } from 'react'
import { Circle as _Circle, Text as _Text, Path, Svg, Symbol } from 'react-native-svg'
import type { IconProps } from '@tamagui/helpers-icon'
import { themed } from '@tamagui/helpers-icon'

const Icon = (props) => {
  const { color = 'black', size = 24, ...otherProps } = props
  return (
    <Svg width={size} height={size} viewBox="0 0 37 36" fill="none" {...otherProps}>
      <Path
        d="M17.876 2.368c.143-.49 1.105-.49 1.248 0a22.11 22.11 0 0015.008 15.008c.49.143.49 1.105 0 1.248a22.11 22.11 0 00-15.008 15.008c-.143.49-1.105.49-1.248 0A22.11 22.11 0 002.868 18.624c-.49-.143-.49-1.105 0-1.248A22.11 22.11 0 0017.876 2.368z"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

Icon.displayName = 'VoxSparkle'

export const Sparkle = memo<IconProps>(themed(Icon))
