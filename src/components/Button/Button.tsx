import { cloneElement, useContext } from 'react'
import { getSize } from '@tamagui/get-token'
import { createStyledContext, SizeTokens, styled, Text, useTheme, View, withStaticProperties } from '@tamagui/web'

export const ButtonContext = createStyledContext({
  size: '$md' as SizeTokens,
  variant: 'contained' as const,
  disabled: false,
  'data-testid': 'Button',
})

export const ButtonFrame = styled(View, {
  name: 'VoxButtonContain',
  context: ButtonContext,
  animation: 'quick',
  theme: 'gray',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
  alignSelf: 'flex-start',
  gap: 6,
  cursor: 'pointer',

  disabledStyle: {
    opacity: 0.7,
  },

  variants: {
    variant: {
      contained: {
        backgroundColor: '$background',
        pressStyle: {
          backgroundColor: '$backgroundPress',
        },
        hoverStyle: {
          backgroundColor: '$backgroundHover',
        },
      },
      soft: {
        backgroundColor: '$color',
        pressStyle: {
          backgroundColor: '$colorPress',
        },
        hoverStyle: {
          backgroundColor: '$colorHover',
        },
      },

      outlined: {
        backgroundColor: '$white1',
        borderColor: 'rgba(145, 158, 171, 0.32)',
        borderWidth: 1.5,

        pressStyle: {
          borderColor: '$gray8',
          backgroundColor: 'rgba(145, 158, 171, 0.08)',
        },
      },
      text: {
        backgroundColor: 'transparent',

        pressStyle: {
          backgroundColor: 'rgba(145, 158, 171, 0.16)',
        },
      },
    },

    size: {
      sm: {
        height: '$3',
        paddingHorizontal: '$3',
        borderRadius: '$7',
        gap: 4,
      },
      md: {
        height: '$3.5',
        paddingHorizontal: '$4',
        borderRadius: '$8',
        gap: 6,
      },
      lg: {
        height: '$4',
        paddingHorizontal: '$5',
        borderRadius: '$10',
        gap: 8,
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
    variant: 'contained',
  },
})

// type ButtonProps = GetProps<typeof ButtonFrame>

export const ButtonText = styled(Text, {
  name: 'VoxButtonContain',
  context: ButtonContext,
  color: '$color',
  userSelect: 'none',
  fontWeight: '$6',
  fontSize: '$2',

  variants: {
    variant: {
      contained: {
        color: '$color',
      },
      soft: {
        color: '$background',
      },
      outlined: {
        color: '$gray9',
      },
      text: {
        color: '$gray9',
      },
    },
    size: {
      sm: {
        fontSize: '$2',
      },
      md: {
        fontSize: '$2',
      },
      lg: {
        fontSize: '$2',
      },
    },
  } as const,
})

const ButtonIcon = (props: { children: any }) => {
  const { size } = useContext(ButtonContext.context)
  const smaller = getSize(size, {
    shift: -2,
  })
  const theme = useTheme()
  return cloneElement(props.children, {
    size: smaller.val * 0.5,
    color: theme.color.get(),
  })
}

const Button = withStaticProperties(ButtonFrame, {
  Props: ButtonContext.Provider,
  Text: ButtonText,
  Icon: ButtonIcon,
})

export default Button
