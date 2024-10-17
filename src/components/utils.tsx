import { memo, NamedExoticComponent } from 'react'
import { IconProps } from '@tamagui/helpers-icon'
import { ZStack } from 'tamagui'

export const createDoubleIcon = (props: { icon: NamedExoticComponent<IconProps>; middleIconOffset?: number }) => {
  const DoubleIcon = (iconProps: any) => {
    const { size = 16, color = '$textPrimary', ...otherProps } = iconProps
    return (
      <ZStack height={size} width={size}>
        <props.icon {...otherProps} color={color} size={size} />
        <props.icon
          {...otherProps}
          color={color}
          transform={[{ translateY: props.middleIconOffset || 0 }]}
          strokeWidth={5}
          scale={0.375}
          overflow="visible"
          size={size}
        />
      </ZStack>
    )
  }
  DoubleIcon.displayName = `Double${props.icon.displayName || 'Icon'}`

  return memo<IconProps>(DoubleIcon)
}
