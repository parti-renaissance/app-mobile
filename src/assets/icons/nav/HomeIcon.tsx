import React, { memo } from 'react'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import { themed } from '@tamagui/helpers-icon'
import type { IconProps } from '@tamagui/helpers-icon'
import { randomUUID } from 'expo-crypto'

const uuid = randomUUID()

const inactiveColors = [
  ['#AEB9C3', '#848E9B'],
  ['#D7DCE1', '#C1C7CD'],
]

const activeColors = [
  ['#8690F2', '#7B4DDA'],
  ['#C6CCFF', '#C0A8F3'],
]

type Props = {
  active?: boolean
} & IconProps

const Icon = (props) => {
  const { color = 'black', size = 24, active, ...otherProps } = props
  const getFillUrl = (index: number) => `url(#${uuid}_${active ? 'active_' : 'inactive_'}${index})`

  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...otherProps}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.706 1.759a1.15 1.15 0 00-1.412 0l-12 9.333A1.15 1.15 0 002.85 12v14.667a3.817 3.817 0 003.817 3.816h18.666a3.817 3.817 0 003.817-3.816V12a1.15 1.15 0 00-.444-.908l-12-9.333z"
        fill={getFillUrl(0)}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 14.85A1.15 1.15 0 0010.85 16v13.333a1.146 1.146 0 001.15 1.15h8a1.15 1.15 0 001.15-1.15V16a1.145 1.145 0 00-.463-.922A1.144 1.144 0 0020 14.85h-8z"
        fill={getFillUrl(1)}
      />
      <Defs>
        {inactiveColors.map((color, index) => (
          <LinearGradient
            key={index + color.join()}
            id={`${uuid}_inactive_${index}`}
            x1={2.84998}
            y1={1.51666}
            x2={31.6821}
            y2={27.6945}
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
            x1={2.84998}
            y1={1.51666}
            x2={31.6821}
            y2={27.6945}
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

Icon.displayName = 'HomeIcon'

export const HomeIcon = memo<Props>(themed(Icon))
