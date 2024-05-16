import React, { memo, useId } from 'react'
import Svg, { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg'
import type { IconProps } from '@tamagui/helpers-icon'
import { themed } from '@tamagui/helpers-icon'

const inactiveColors = [['#A9B3BD', '#7A8390']]

const activeColors = [['#FDA302', '#F7681E']]

type Props = {
  active?: boolean
} & IconProps

const Icon = (props) => {
  const uuid = useId()
  const { color = 'black', size = 24, active, ...otherProps } = props
  const getFillUrl = (index: number) => `url(#${uuid}_${active ? 'active_' : 'inactive_'}${index})`

  return (
    <Svg width={24} height={25} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G opacity={0.6} clipPath="url(#clip0_2510_114200)">
        <Path d="M20 20.76V5.24c0-.41-.32-.74-.714-.74H12v17h7.286c.394 0 .714-.33.714-.74z" fill={getFillUrl(0)} fillOpacity={0.6} />
        <Path d="M20 20.76V5.24c0-.41-.32-.74-.714-.74H12v17h7.286c.394 0 .714-.33.714-.74z" fill="#fff" fillOpacity={0.5} />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.663 3.117A.717.717 0 005 3.834v17.332c0 .377.29.69.663.717l8.572.615c.413.03.765-.3.765-.716V3.218a.716.716 0 00-.765-.716l-8.572.615zm7.908 10.82c.395 0 .715-.2.715-.719 0-.52-.357-.718-.715-.718-.357 0-.714.139-.714.718 0 .58.32.718.714.718z"
          fill={getFillUrl(0)}
        />
        <Path fillRule="evenodd" clipRule="evenodd" d="M11 8.5l-3-.1v-.8l3-.1v1z" fill={getFillUrl(0)} fillOpacity={0.6} />
        <Path fillRule="evenodd" clipRule="evenodd" d="M11 8.5l-3-.1v-.8l3-.1v1z" fill="#fff" fillOpacity={0.5} />
      </G>

      <Defs>
        {inactiveColors.map((color, index) => (
          <LinearGradient key={index + color.join()} id={`${uuid}_inactive_${index}`} gradientUnits="userSpaceOnUse">
            <Stop stopColor={color[0]} />
            <Stop offset={1} stopColor={color[1]} />
          </LinearGradient>
        ))}

        {activeColors.map((color, index) => (
          <LinearGradient key={index + color.join()} id={`${uuid}_active_${index}`} gradientUnits="userSpaceOnUse">
            <Stop stopColor={color[0]} />
            <Stop offset={1} stopColor={color[1]} />
          </LinearGradient>
        ))}
      </Defs>
    </Svg>
  )
}

Icon.displayName = 'DoorIcon'

export const DoorIcon = memo<Props>(themed(Icon))
