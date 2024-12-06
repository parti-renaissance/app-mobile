import { ComponentProps, NamedExoticComponent } from 'react'
import { IconProps } from '@tamagui/helpers-icon'
import { styled, XStack } from 'tamagui'
import Text from '../base/Text'

const ChipFrame = styled(XStack, {
  backgroundColor: '$color1',
  borderRadius: 999,
  paddingVertical: 4,
  paddingHorizontal: 8,
  alignItems: 'center',
  variants: {
    outlined: {
      true: {
        backgroundColor: 'transparent',
        borderWidth: 1.2,
        borderColor: '$color5',
      },
    },
  },
  gap: 4,
} as const)

export type ChipProps = {
  children: string
} & ComponentProps<typeof ChipFrame>

const Chip = ({ children, ...props }: ChipProps & { icon?: NamedExoticComponent<IconProps> }) => {
  return (
    <ChipFrame {...props} theme={props.theme ?? 'gray'}>
      {props.icon && <props.icon color="$color5" testID={`chip-icon`} size={12} />}
      <Text.SM semibold color="$color5">
        {children}
      </Text.SM>
    </ChipFrame>
  )
}

export default Chip
