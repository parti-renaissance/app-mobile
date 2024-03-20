import React, { Fragment, memo } from 'react'
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
  ['#52ABFB', '#0868E7'],
  ['#A8D5FD', '#84B4F3'],
]

type Props = {
  active?: boolean
} & IconProps

const Icon = (props) => {
  const { color = 'black', size = 24, active, ...otherProps } = props
  const getFillUrl = (index: number) => `url(#${uuid}_${active ? 'active_' : 'inactive_'}${index})`
  const getStateFromIndex = (isActive: number, pos: number) => `${uuid}_${isActive ? 'active' : 'inactive'}_${pos}`

  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...otherProps}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.85 13.333c0-.635.515-1.15 1.15-1.15h24c.635 0 1.15.515 1.15 1.15v13.334a3.817 3.817 0 01-3.817 3.816H6.667a3.817 3.817 0 01-3.817-3.816V13.333z"
        fill={getFillUrl(0)}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.85 8a3.817 3.817 0 013.817-3.817h18.666A3.817 3.817 0 0129.15 8v5.333a1.15 1.15 0 01-1.15 1.15H4a1.15 1.15 0 01-1.15-1.15V8z"
        fill={getFillUrl(1)}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.333 1.517c.636 0 1.15.515 1.15 1.15V8a1.15 1.15 0 11-2.3 0V2.667c0-.635.515-1.15 1.15-1.15z"
        fill={getFillUrl(2)}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.667 1.517c.635 0 1.15.515 1.15 1.15V8a1.15 1.15 0 11-2.3 0V2.667c0-.635.515-1.15 1.15-1.15z"
        fill={getFillUrl(3)}
      />
      <Defs>
        {[inactiveColors, activeColors].map(([g1, g2], i) => (
          <Fragment key={i}>
            <LinearGradient id={getStateFromIndex(i, 0)} x1={2.84998} y1={12.1833} x2={20.0091} y2={36.8437} gradientUnits="userSpaceOnUse">
              <Stop stopColor={g2[0]} />
              <Stop offset={1} stopColor={g2[1]} />
            </LinearGradient>
            <LinearGradient id={getStateFromIndex(i, 1)} x1={2.84998} y1={4.18335} x2={9.8448} y2={22.0439} gradientUnits="userSpaceOnUse">
              <Stop stopColor={g1[0]} />
              <Stop offset={1} stopColor={g1[1]} />
            </LinearGradient>
            <LinearGradient id={getStateFromIndex(i, 2)} x1={20.1833} y1={1.51666} x2={24.4005} y2={2.78733} gradientUnits="userSpaceOnUse">
              <Stop stopColor={g2[0]} />
              <Stop offset={1} stopColor={g2[1]} />
            </LinearGradient>
            <LinearGradient id={getStateFromIndex(i, 3)} x1={9.51672} y1={1.51666} x2={13.7339} y2={2.78733} gradientUnits="userSpaceOnUse">
              <Stop stopColor={g2[0]} />
              <Stop offset={1} stopColor={g2[1]} />
            </LinearGradient>
          </Fragment>
        ))}
      </Defs>
    </Svg>
  )
}

Icon.displayName = 'EventIcon'

export const EventIcon = memo<Props>(themed(Icon))
