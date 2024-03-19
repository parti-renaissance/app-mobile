import React, { memo } from 'react'
import Animated from 'react-native-reanimated'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import { themed } from '@tamagui/helpers-icon'
import type { IconProps } from '@tamagui/helpers-icon'
import { randomUUID } from 'expo-crypto'

const uuid = randomUUID()

const inactiveColors = ['#AEB9C3', '#848E9B'] as const

const activeColors = ['#58D470', '#069D22'] as const

type Props = {
  active?: boolean
} & IconProps

const Icon = (props) => {
  const { color = 'black', size = 24, active = false, ...otherProps } = props
  const getFillUrl = (index: number) => `url(#${uuid}_${active ? 'active_' : 'inactive_'}${index})`

  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...otherProps}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.7912 1.61177C18.2595 1.81505 18.5378 2.30273 18.4744 2.80931L17.3027 12.1833H28C28.4462 12.1833 28.8522 12.4415 29.0414 12.8456C29.2307 13.2496 29.1691 13.7267 28.8834 14.0695L15.5501 30.0695C15.2233 30.4617 14.677 30.5915 14.2087 30.3882C13.7404 30.1849 13.4622 29.6973 13.5255 29.1907L14.6973 19.8167H3.99999C3.55377 19.8167 3.14783 19.5585 2.95856 19.1544C2.7693 18.7504 2.83087 18.2733 3.11654 17.9305L16.4499 1.93045C16.7767 1.53826 17.3229 1.40849 17.7912 1.61177Z"
        fill={getFillUrl(0)}
      />

      <Defs>
        <LinearGradient id={`${uuid}_inactive_${0}`} x1="2.84998" y1="1.5166" x2="31.6822" y2="27.6944" gradientUnits="userSpaceOnUse">
          <Stop stopColor={inactiveColors[0]} />
          <Stop offset={1} stopColor={inactiveColors[1]} />
        </LinearGradient>

        <LinearGradient id={`${uuid}_active_${0}`} x1="2.84998" y1="1.5166" x2="31.6822" y2="27.6944" gradientUnits="userSpaceOnUse">
          <Stop stopColor={activeColors[0]} />
          <Stop offset={1} stopColor={activeColors[1]} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

Icon.displayName = 'ActionIcon'

export const ActionIcon = memo<Props>(themed(Icon))
