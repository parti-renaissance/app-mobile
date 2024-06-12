import React, { memo, useId } from 'react'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import type { IconProps } from '@tamagui/helpers-icon'
import { themed } from '@tamagui/helpers-icon'

const inactiveColors = [
  ['#D7DCE1', '#C1C7CD'],
  ['#AEB9C3', '#848E9B'],
]

const activeColors = [
  ['#F1B0F4', '#C596DF'],
  ['#DB5DDF', '#862CB8'],
]

type Props = {
  active?: boolean
} & IconProps

const Icon = (props) => {
  const uuid = useId()
  const { color = 'black', size = 24, active, ...otherProps } = props
  const getFillUrl = (index: number) => `url(#${uuid}_${active ? 'active_' : 'inactive_'}${index})`

  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...otherProps}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.653 4.183h12.694A3.819 3.819 0 0125.762 6.3l.001.002 4.599 9.183c.08.16.121.336.121.515v8a3.817 3.817 0 01-3.816 3.817H5.333A3.817 3.817 0 011.517 24v-8c0-.179.041-.355.121-.515l4.599-9.183V6.3a3.817 3.817 0 013.416-2.117z"
        fill={getFillUrl(0)}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.667 14.85c.384 0 .743.192.957.512l2.325 3.488h4.102l2.325-3.488a1.15 1.15 0 01.957-.512h8a1.15 1.15 0 011.15 1.15v8a3.817 3.817 0 01-3.816 3.817H5.333A3.817 3.817 0 011.517 24v-8c0-.635.514-1.15 1.15-1.15h8z"
        fill={getFillUrl(1)}
      />
      <Defs>
        {inactiveColors.map((color, index) => (
          <LinearGradient
            key={index + color.join()}
            id={`${uuid}_inactive_${index}`}
            x1={1.5166}
            y1={4.18335}
            x2={24.6689}
            y2={32.5605}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={color[0]} />
            <Stop offset={1} stopColor={color[1]} />
          </LinearGradient>
        ))}

        {activeColors.map((color, index) => (
          <LinearGradient
            key={index + color.join()}
            id={`${uuid}_active_${index}`}
            x1={1.5166}
            y1={14.85}
            x2={11.1875}
            y2={36.4542}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={color[0]} />
            <Stop offset={1} stopColor={color[1]} />
          </LinearGradient>
        ))}
      </Defs>
    </Svg>
  )
}

Icon.displayName = 'ToolsIcon'

export const ToolsIcon = memo<Props>(themed(Icon))
