import { ComponentProps } from 'react'
import type { IconProps } from '@tamagui/helpers-icon'
import { ChevronRight } from '@tamagui/lucide-icons'
import { styled, View, XStack, YStack } from 'tamagui'
import Text from '../base/Text'

const ItemFrame = styled(XStack, {
  animation: '100ms',
  width: '100%',
  backgroundColor: '$white1',
  paddingHorizontal: 20,
  alignItems: 'center',
  cursor: 'pointer',
  height: 56,
  hoverStyle: {
    backgroundColor: '$gray2',
  },
  pressStyle: {
    backgroundColor: '$gray2',
  },

  variants: {
    size: {
      sm: {
        height: 56,
      },
      lg: {
        borderBottomWidth: 1,
        borderBottomColor: '$textOutline',
      },
    },

    active: {
      true: {
        backgroundColor: '$gray1',
        hoverStyle: {
          backgroundColor: '$gray1',
        },
        pressStyle: {
          backgroundColor: '$gray1',
        },
      },
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
        fontSize: 14,
      },
      lg: {
        fontSize: '$4',
      },
    },
    active: {
      true: {},
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
      <Icon size={props.size === 'lg' ? 16 : '$1'} color="$textPrimary" marginRight={8} />
      <XStack width="100%" flexShrink={1}>
        <ItemText size={props.size ?? 'sm'} active={props.active}>
          {children}
        </ItemText>
      </XStack>
      {props.size === 'lg' && <ChevronRight size="$1" color="$textPrimary" />}
    </ItemFrame>
  )
}

export default Item
