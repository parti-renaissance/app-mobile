import { ComponentProps } from 'react'
import type { IconProps } from '@tamagui/helpers-icon'
import { ChevronRight } from '@tamagui/lucide-icons'
import { createStyledContext, styled, View, XStack } from 'tamagui'
import Text from '../base/Text'

const ItemFrame = styled(XStack, {
  animation: '100ms',
  flex: 1,
  background: '$white1',
  paddingHorizontal: '$4',
  borderBottomWidth: 1,
  alignItems: 'center',
  borderColor: '$gray2',
  cursor: 'pointer',
  hoverStyle: {
    background: '$gray1',
  },
  pressStyle: {
    background: '$gray3',
  },
  variants: {
    size: {
      sm: {
        height: '$4',
      },
      lg: {
        height: '$6',
      },
    },

    active: {
      true: { background: '$gray1' },
    },
    last: {
      true: {
        borderColor: '$colorTransparent',
      },
    },
  } as const,

  defaultVariants: {
    size: 'sm',
  },
})

const ItemText = styled(Text, {
  animation: '100ms',
  variants: {
    size: {
      sm: {
        fontSize: '$2',
      },
      lg: {
        fontSize: '$4',
      },
    },
    active: {
      true: {
        fontWeight: 600,
      },
    },
  } as const,
  defaultVariants: {
    size: 'sm',
  },
})

const Item = ({
  children,
  icon: Icon,
  ...props
}: ComponentProps<typeof ItemFrame> & { children: string | string[]; icon: React.ExoticComponent<IconProps> }) => {
  return (
    <ItemFrame {...props}>
      <View height="100%" width={8} backgroundColor="$gray3" display={props.active ? 'flex' : 'none'} position="absolute" top={0} left={0} />
      <Icon size={props.size === 'lg' ? '$2' : '$1'} color="$textPrimary" marginRight="$2" />
      <ItemText size={props.size ?? 'sm'} active={props.active}>
        {children}
      </ItemText>
      <XStack justifyContent="flex-end" flex={1}>
        <ChevronRight size="$1" color="$textPrimary" />
      </XStack>
    </ItemFrame>
  )
}

export default Item
