import { ComponentProps } from 'react'
import { styled, View, Text, H5 } from 'tamagui'
const ChipFrame = styled(View, {
  name: 'Chip',
  backgroundColor: '$black1',
  borderRadius: '$12',
  paddingVertical: '$space.1.5',
  paddingHorizontal: '$space.2.5',
  variants: {
    news: {
      true: {
        backgroundColor: '$black1',
      },
    },
    event: {
      true: {
        backgroundColor: '$blue8',
      },
    },
    riposte: {
      true: {
        backgroundColor: '$orange7',
      },
    },
    action: {
      true: {
        backgroundColor: '$green8',
      },
    },

  } as const,
  defaultVariants: {
    news: true,
  },
} as const)


export type ChipProps = {
  children: string
} & ComponentProps<typeof ChipFrame>


const Chip = ({children, ...props}: ChipProps) => {
  return (
    <ChipFrame {...props}>
      <Text fontSize="$1" color="$white1">{children}</Text>
    </ChipFrame>
  )
}


export default Chip
