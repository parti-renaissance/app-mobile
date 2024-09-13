import { cloneElement, useContext } from 'react'
import { getSize } from '@tamagui/get-token'
import { createStyledContext, SizeTokens, styled, Text, useTheme, View, withStaticProperties } from '@tamagui/web'

export const ButtonContext = createStyledContext({
  size: '$md' as SizeTokens,
  variant: 'contained' as const,
  pop: false,
  disabled: false,
  'data-testid': 'Button',
})

export const ButtonFrameStyled = styled(View, {
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
    opacity: 0.3,
    cursor: 'not-allowed',
  },

  variants: {
    full: {
      true: {
        width: '100%',
      },
    },
    pop: {
      true: {
        transform: '$color7',
      },
    },
    variant: {
      contained: {
        backgroundColor: '$color4',
        hoverStyle: {
          backgroundColor: '$color6',
        },
        pressStyle: {
          backgroundColor: '$color0',
        },
      },
      soft: {
        backgroundColor: '$color1',
        hoverStyle: {
          backgroundColor: '$color2',
        },
        pressStyle: {
          backgroundColor: '$colorTransparent',
        },
      },

      outlined: {
        backgroundColor: '$colorTransparent',
        borderColor: '$color5',
        borderWidth: 2,
        hoverStyle: {
          borderColor: '$color6',
          backgroundColor: '$color/8',
        },

        pressStyle: {
          borderColor: '$color5',
          backgroundColor: '$color5',
        },
      },
      text: {
        backgroundColor: 'transparent',
        hoverStyle: {
          backgroundColor: '$color0',
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

const ButtonFrame = (props: React.ComponentProps<typeof ButtonFrameStyled>) => {
  if ((props.theme === undefined || props.theme === 'gray') && props.variant === 'outlined') {
    return <ButtonFrameStyled {...props} borderColor="$textOutline32" />
  }
  return <ButtonFrameStyled {...props} />
}

// type ButtonProps = GetProps<typeof ButtonFrame>

export const ButtonText = styled(Text, {
  context: ButtonContext,
  color: '$color',
  userSelect: 'none',
  fontWeight: '$6',
  fontSize: '$2',

  variants: {
    variant: {
      contained: {
        color: '$white1',
        pressStyle: {
          color: '$textPrimary',
        },
      },
      soft: {
        color: '$color6',
      },
      outlined: {
        color: '$color6',
        pressStyle: {
          color: '$white1',
        },
      },
      text: {
        color: '$color5',
        pressStyle: {
          color: '$color6',
        },
      },
    },
    pop: {
      true: {
        color: '$color7',
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
