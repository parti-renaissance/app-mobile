import { ComponentProps } from 'react'
import { styled, View } from 'tamagui'
import Text from '../base/Text'

export const BadgeFrame = styled(View, {
  name: 'VoxBadge',
  backgroundColor: '$background',
  borderRadius: '$12',
  paddingVertical: '$space.1.5',
  paddingHorizontal: '$space.2.5',
} as const)

export type BadgeProps = {
  children: string | string[]
} & ComponentProps<typeof BadgeFrame>

const Badge = ({ children, ...props }: BadgeProps) => {
  return (
    <BadgeFrame {...props}>
      <Text fontWeight="$6" fontSize="$1" color="$color">
        {children}
      </Text>
    </BadgeFrame>
  )
}

export default Badge
