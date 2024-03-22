import React, { memo } from 'react'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import { themed } from '@tamagui/helpers-icon'
import type { IconProps } from '@tamagui/helpers-icon'
import { randomUUID } from 'expo-crypto'

const uuid = randomUUID()
const inactiveColors = ['#AEB9C3', '#848E9B'] as const
const activeColors = ['#EB9803', '#E6621C'] as const

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
        d="M15.9993 2.84998C16.4962 2.84968 16.9371 3.1686 17.0924 3.64066L19.6434 11.3963C19.7173 11.6247 19.8444 11.8322 20.0142 12.0019C20.184 12.1716 20.3917 12.2985 20.6201 12.3723L20.6246 12.3738L28.358 14.9071C28.8302 15.0618 29.1497 15.5023 29.15 15.9993C29.1503 16.4962 28.8313 16.9371 28.3593 17.0924L20.6086 19.6417L20.6036 19.6434C20.3753 19.7173 20.1677 19.8444 19.998 20.0142C19.8284 20.184 19.7014 20.3917 19.6276 20.6201L19.6262 20.6246L17.0928 28.358C16.9381 28.8302 16.4976 29.1497 16.0007 29.15C15.5037 29.1503 15.0628 28.8313 14.9076 28.3593L12.3582 20.6086L12.3566 20.6036C12.2826 20.3753 12.1555 20.1677 11.9857 19.998C11.8159 19.8284 11.6083 19.7014 11.3799 19.6276L11.3753 19.6262L3.64197 17.0928C3.16973 16.9381 2.85027 16.4976 2.84998 16.0007C2.84968 15.5037 3.1686 15.0628 3.64066 14.9076L11.3963 12.3566C11.6247 12.2826 11.8322 12.1555 12.0019 11.9857C12.1716 11.8159 12.2985 11.6083 12.3723 11.3799L12.3738 11.3753L14.9071 3.64197C15.0618 3.16973 15.5023 2.85027 15.9993 2.84998Z"
        fill={getFillUrl(0)}
      />

      <Defs>
        <LinearGradient id={`${uuid}_inactive_${0}`} x1="2.84998" y1="2.84998" x2="29.15" y2="29.15" gradientUnits="userSpaceOnUse">
          <Stop stopColor={inactiveColors[0]} />
          <Stop offset={1} stopColor={inactiveColors[1]} />
        </LinearGradient>

        <LinearGradient id={`${uuid}_active_${0}`} x1="2.84998" y1="2.84998" x2="29.15" y2="29.15" gradientUnits="userSpaceOnUse">
          <Stop stopColor={activeColors[0]} />
          <Stop offset={1} stopColor={activeColors[1]} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

Icon.displayName = 'RipostIcon'

export const RipostIcon = memo<Props>(themed(Icon))
