import { ComponentProps } from 'react'
import type { IconProps } from '@tamagui/helpers-icon'
import { ChevronRight } from '@tamagui/lucide-icons'
import { styled, View, XStack, YStack } from 'tamagui'
import Text from '../base/Text'

const ItemFrame = styled(XStack, {
  animation: '100ms',
  // flex: 1,
  width: '100%',
  backgroundColor: '$white1',
  paddingHorizontal: '$4',
  borderBottomWidth: 1,
  alignItems: 'center',
  borderColor: '$color1',
  cursor: 'pointer',
  hoverStyle: {
    backgroundColor: '$gray1',
  },
  pressStyle: {
    backgroundColor: '$gray1',
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
      true: { backgroundColor: '$gray1' },
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
      <View height="100%" width={8} backgroundColor="$gray2" display={props.active ? 'flex' : 'none'} position="absolute" top={0} left={0} />
      <Icon size={props.size === 'lg' ? '$2' : '$1'} color="$textPrimary" marginRight="$2" />
      <XStack width="100%" flexShrink={1}>
        <ItemText size={props.size ?? 'sm'} active={props.active}>
          {children}
        </ItemText>
      </XStack>
      <ChevronRight size="$1" color="$textPrimary" />
    </ItemFrame>
  )
}

export default Item
