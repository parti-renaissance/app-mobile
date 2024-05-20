import { styled, YStack, YStackProps } from 'tamagui'
import Text from '../base/Text'

export type TabProps = {
  children: string | string[]
  active?: boolean
  grouped?: boolean
  onPress?: () => void
} & YStackProps

const TabContainer = styled(YStack, {
  cursor: 'pointer',
  height: 48,
  justifyContent: 'center',
  alignItems: 'center',
  borderBottomWidth: 2,
  borderBottomColor: 'transparent',
  animation: 'medium',

  hoverStyle: {
    borderBottomColor: '$textSecondary',
  },
  pressStyle: {
    backgroundColor: '$gray4',
  },
  variants: {
    grouped: {
      true: {
        justifyContent: 'center',
        flex: 1,
      },
    },
    active: {
      true: {
        borderBottomColor: '$textPrimary',
      },
    },
  },
} as const)

const TabText = styled(Text, {
  color: '$textSecondary',
  cursor: 'pointer',
  hoverStyle: {
    color: '$textSecondary',
  },
  pressStyle: {
    color: '$textPrimary',
  },
  variants: {
    active: {
      true: {
        color: '$textPrimary',
        hoverStyle: {
          color: '$textPrimary',
        },
      },
    },
    grouped: {
      true: {
        textAlign: 'center',
      },
    },
  },
} as const)

export default function Tab({ children, active, onPress, grouped, ...rest }: TabProps & YStackProps) {
  return (
    <TabContainer {...rest} onPress={onPress} active={active} grouped={grouped}>
      <TabText textAlign="center" active={active} grouped={grouped} onPress={onPress}>
        {children}
      </TabText>
    </TabContainer>
  )
}
