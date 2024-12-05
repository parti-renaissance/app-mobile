import * as React from 'react'
import { Defs, LinearGradient, Path, Stop, Svg, SvgProps } from 'react-native-svg'

function EmptyStateFormationIllustration(props: SvgProps) {
  const id = React.useId()
  return (
    <Svg width={74} height={83} viewBox="0 0 74 83" fill="none" {...props}>
      <Path
        d="M.996 62.571A3.647 3.647 0 01.5 60.735V53.17h72.982v7.565a3.648 3.648 0 01-1.849 3.173L40.637 81.63a7.293 7.293 0 01-7.293 0L2.35 63.908A3.647 3.647 0 01.996 62.57z"
        fill={`url(#paint0_linear_${id})`}
      />
      <Path
        d="M36.99 75.041a7.293 7.293 0 01-3.646-.977l-16.41-9.407L37.01 53.17 57.09 64.657l-16.454 9.407a7.293 7.293 0 01-3.646.977z"
        fill={`url(#paint1_linear_${id})`}
      />
      <Path
        d="M37.035 31.299c1.28 0 2.538.337 3.647.977l16.41 9.407L37.016 53.17 16.935 41.683l16.454-9.407a7.293 7.293 0 013.646-.978z"
        fill={`url(#paint2_linear_${id})`}
      />
      <Path
        d="M.996 51.332a3.646 3.646 0 011.353-1.337l14.586-8.327 20.074 11.5-20.074 11.487L2.349 56.34a3.647 3.647 0 01-1.353-5.008z"
        fill={`url(#paint3_linear_${id})`}
      />
      <Path
        d="M73.004 54.992a3.645 3.645 0 01-1.353 1.337l-14.586 8.327-20.074-11.5 20.074-11.487 14.586 8.315a3.647 3.647 0 011.353 5.008z"
        fill={`url(#paint4_linear_${id})`}
      />
      <Path d="M58.87 13.057l-21.88 10.94V2.117l21.88 10.94z" fill="#E3E8ED" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.878.316a2.117 2.117 0 012.06-.092l21.88 10.94a2.117 2.117 0 010 3.787l-21.88 10.94a2.117 2.117 0 01-3.065-1.894V2.117c0-.733.38-1.415 1.005-1.8zm3.23 5.227v15.028l15.028-7.514-15.028-7.514z"
        fill="#E3E8ED"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.99 0c1.17 0 2.118.948 2.118 2.117v36.466a2.117 2.117 0 11-4.234 0V2.117C34.873.948 35.82 0 36.99 0z"
        fill={`url(#paint5_linear_${id})`}
      />
      <Defs>
        <LinearGradient id={`paint0_linear_${id}`} x1={41.4355} y1={82.8129} x2={50.8924} y2={48.9901} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#C8D1DA" />
          <Stop offset={1} stopColor="#8797A8" />
        </LinearGradient>
        <LinearGradient id={`paint1_linear_${id}`} x1={58.2936} y1={69.4376} x2={33.5774} y2={46.3742} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#EAEDEF" />
          <Stop offset={1} stopColor="#D2DCE5" />
        </LinearGradient>
        <LinearGradient id={`paint2_linear_${id}`} x1={15.7323} y1={36.9022} x2={40.4485} y2={59.9657} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#EAEDEF" />
          <Stop offset={1} stopColor="#D2DCE5" />
        </LinearGradient>
        <LinearGradient id={`paint3_linear_${id}`} x1={18.7546} y1={41.668} x2={18.7546} y2={64.655} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#D2DCE5" />
          <Stop offset={1} stopColor="#B1BCC8" />
        </LinearGradient>
        <LinearGradient id={`paint4_linear_${id}`} x1={55.2454} y1={64.6562} x2={55.2455} y2={41.6692} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#D2DCE5" />
          <Stop offset={1} stopColor="#B1BCC8" />
        </LinearGradient>
        <LinearGradient id={`paint5_linear_${id}`} x1={32.7309} y1={40.9355} x2={40.4023} y2={40.6341} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#8797A8" />
          <Stop offset={1} stopColor="#C8D1DA" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default React.memo(EmptyStateFormationIllustration)
