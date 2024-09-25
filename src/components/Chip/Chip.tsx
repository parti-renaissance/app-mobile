import { ComponentProps } from 'react'
import { styled, View } from 'tamagui'
import Text from '../base/Text'

const ChipFrame = styled(View, {
  backgroundColor: '$color1',
  borderRadius: '$12',
  paddingVertical: '$space.1.5',
  paddingHorizontal: '$space.2.5',
} as const)

export type ChipProps = {
  children: string
} & ComponentProps<typeof ChipFrame>

const Chip = ({ children, ...props }: ChipProps) => {
  return (
    <ChipFrame {...props} theme={props.theme ?? 'gray'}>
      <Text fontWeight="$6" fontSize="$1" color="$color5">
        {children}
      </Text>
    </ChipFrame>
  )
}

export default Chip
