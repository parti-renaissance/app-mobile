import React, { memo } from 'react'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import type { IconProps } from '@tamagui/helpers-icon'
import { themed } from '@tamagui/helpers-icon'

type Props = {
  active?: boolean
} & IconProps

const Icon = (props) =>
  props.active ? (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M27 27V6a1 1 0 00-1-1h-6v23h6a1 1 0 001-1z" fill="url(#paint0_linear_2651_82040)" />
      <Path d="M18 18c.552 0 1-.276 1-1s-.5-1-1-1-1 .193-1 1c0 .807.448 1 1 1z" fill="url(#paint1_linear_2651_82040)" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.929 2.934A1 1 0 006 3.93V28.07a1 1 0 00.929.997l12 .858A1 1 0 0020 28.925V3.074a1 1 0 00-1.071-.997l-12 .857zM18 18c.552 0 1-.276 1-1s-.5-1-1-1-1 .193-1 1c0 .807.448 1 1 1z"
        fill="url(#paint2_linear_2651_82040)"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 10.5a.488.488 0 01-.5.488l-3.1-.078a.41.41 0 010-.82l3.1-.077c.274-.007.5.213.5.487z"
        fill="url(#paint3_linear_2651_82040)"
      />
      <Defs>
        <LinearGradient id="paint0_linear_2651_82040" x1={23.5} y1={5} x2={23.5} y2={28} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FED181" />
          <Stop offset={1} stopColor="#FBB48F" />
        </LinearGradient>
        <LinearGradient id="paint1_linear_2651_82040" x1={18} y1={16} x2={18} y2={18} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FED181" />
          <Stop offset={1} stopColor="#FBB48F" />
        </LinearGradient>
        <LinearGradient id="paint2_linear_2651_82040" x1={13} y1={2.07397} x2={13} y2={29.9261} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FDA302" />
          <Stop offset={1} stopColor="#F7681E" />
        </LinearGradient>
        <LinearGradient id="paint3_linear_2651_82040" x1={13} y1={10} x2={13} y2={11} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FED181" />
          <Stop offset={1} stopColor="#FBB48F" />
        </LinearGradient>
      </Defs>
    </Svg>
  ) : (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M27 27V6a1 1 0 00-1-1h-6v23h6a1 1 0 001-1z" fill="url(#paint0_linear_2651_82046)" />
      <Path d="M18 18c.552 0 1-.276 1-1s-.5-1-1-1-1 .193-1 1c0 .807.448 1 1 1z" fill="url(#paint1_linear_2651_82046)" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.929 2.934A1 1 0 006 3.93V28.07a1 1 0 00.929.997l12 .858A1 1 0 0020 28.925V3.074a1 1 0 00-1.071-.997l-12 .857zM18 18c.552 0 1-.276 1-1s-.5-1-1-1-1 .193-1 1c0 .807.448 1 1 1z"
        fill="url(#paint2_linear_2651_82046)"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.929 2.934A1 1 0 006 3.93V28.07a1 1 0 00.929.997l12 .858A1 1 0 0020 28.925V3.074a1 1 0 00-1.071-.997l-12 .857zM18 18c.552 0 1-.276 1-1s-.5-1-1-1-1 .193-1 1c0 .807.448 1 1 1z"
        fill="url(#paint3_linear_2651_82046)"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 10.5a.488.488 0 01-.5.488l-3.1-.078a.41.41 0 010-.82l3.1-.077c.274-.007.5.213.5.487z"
        fill="url(#paint4_linear_2651_82046)"
      />
      <Defs>
        <LinearGradient id="paint0_linear_2651_82046" x1={23.5} y1={5} x2={23.5} y2={28} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#DDE1E5" />
          <Stop offset={1} stopColor="#C7CBD1" />
        </LinearGradient>
        <LinearGradient id="paint1_linear_2651_82046" x1={18} y1={16} x2={18} y2={18} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#DDE1E5" />
          <Stop offset={1} stopColor="#C7CBD1" />
        </LinearGradient>
        <LinearGradient id="paint2_linear_2651_82046" x1={13} y1={2.07397} x2={13} y2={29.9261} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FDA302" />
          <Stop offset={1} stopColor="#F7681E" />
        </LinearGradient>
        <LinearGradient id="paint3_linear_2651_82046" x1={13} y1={2.07397} x2={13} y2={29.9261} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#A9B3BD" />
          <Stop offset={1} stopColor="#7A8390" />
        </LinearGradient>
        <LinearGradient id="paint4_linear_2651_82046" x1={13} y1={10.0125} x2={13} y2={10.9878} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#DDE1E5" />
          <Stop offset={1} stopColor="#C7CBD1" />
        </LinearGradient>
      </Defs>
    </Svg>
  )

Icon.displayName = 'DoorIcon'

export const DoorIcon = memo<Props>(themed(Icon))
