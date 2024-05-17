import React, { Fragment, memo, useId } from 'react'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import type { IconProps } from '@tamagui/helpers-icon'
import { themed } from '@tamagui/helpers-icon'

type Props = {
  active?: boolean
} & IconProps

const inactiveColors = [
  ['#AEB9C3', '#848E9B'],
  ['#D7DCE1', '#C1C7CD'],
]

const activeColors = [
  ['#FDA302', '#F7681E'],
  ['#FED181', '#FBB48F'],
]

const Icon = (props) => {
  const { active, size = 24, ...otherProp } = props
  const uuid = useId()
  const getFillUrl = (index: number) => `url(#${uuid}_${active ? 'active_' : 'inactive_'}${index})`
  const getStateFromIndex = (isActive: number, pos: number) => `${uuid}_${isActive ? 'active' : 'inactive'}_${pos}`

  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...otherProp}>
      <Path d="M27 27V6a1 1 0 00-1-1h-6v23h6a1 1 0 001-1z" fill={getFillUrl(0)} />
      <Path d="M18 18c.552 0 1-.276 1-1s-.5-1-1-1-1 .193-1 1c0 .807.448 1 1 1z" fill={getFillUrl(1)} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.929 2.934A1 1 0 006 3.93V28.07a1 1 0 00.929.997l12 .858A1 1 0 0020 28.925V3.074a1 1 0 00-1.071-.997l-12 .857zM18 18c.552 0 1-.276 1-1s-.5-1-1-1-1 .193-1 1c0 .807.448 1 1 1z"
        fill={getFillUrl(2)}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 10.5a.488.488 0 01-.5.488l-3.1-.078a.41.41 0 010-.82l3.1-.077c.274-.007.5.213.5.487z"
        fill={getFillUrl(3)}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 10.5a.488.488 0 01-.5.488l-3.1-.078a.41.41 0 010-.82l3.1-.077c.274-.007.5.213.5.487z"
        fill={getFillUrl(4)}
      />

      <Defs>
        {[inactiveColors, activeColors].map(([g1, g2], i) => (
          <Fragment key={i}>
            <LinearGradient id={getStateFromIndex(i, 0)} x1={23.5} y1={5} x2={23.5} y2={28} gradientUnits="userSpaceOnUse">
              <Stop stopColor={g2[0]} />
              <Stop offset={1} stopColor={g2[1]} />
            </LinearGradient>
            <LinearGradient id={getStateFromIndex(i, 1)} x1={23.5} y1={5} x2={23.5} y2={28} gradientUnits="userSpaceOnUse">
              <Stop stopColor={g2[0]} />
              <Stop offset={1} stopColor={g2[1]} />
            </LinearGradient>
            <LinearGradient id={getStateFromIndex(i, 2)} x1={13} y1={2.07397} x2={13} y2={29.9261} gradientUnits="userSpaceOnUse">
              <Stop stopColor={g1[0]} />
              <Stop offset={1} stopColor={g1[1]} />
            </LinearGradient>
            <LinearGradient id={getStateFromIndex(i, 3)} x1={13} y1={2.07397} x2={13} y2={29.9261} gradientUnits="userSpaceOnUse">
              <Stop stopColor={g2[0]} />
              <Stop offset={1} stopColor={g2[1]} />
            </LinearGradient>
          </Fragment>
        ))}
      </Defs>
    </Svg>
  )
}

Icon.displayName = 'DoorIcon'

export const DoorIcon = memo<Props>(themed(Icon))
