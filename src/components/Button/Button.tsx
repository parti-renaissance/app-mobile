import { cloneElement, useContext } from 'react'
import { getSize } from '@tamagui/get-token'
import {
  createStyledContext,
  SizeTokens,
  styled,
  Text,
  useTheme,
  View,
  withStaticProperties,
} from '@tamagui/web'

export const ButtonContext = createStyledContext({
  size: '$md' as SizeTokens,
  variant: 'contained' as const,
  disabled: false,
})

export const ButtonFrame = styled(View, {
  name: 'Button',
  context: ButtonContext,

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
        backgroundColor: '$gray8',

        pressStyle: {
          backgroundColor: '$gray7',
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
        paddingVertical: '$1',
        paddingHorizontal: '$2',
        borderRadius: '$2',
        gap: 4,
      },
      md: {
        paddingVertical: '$2',
        paddingHorizontal: '$3',
        borderRadius: '$4',
        gap: 6,
      },
      lg: {
        paddingVertical: '$3',
        paddingHorizontal: '$4',
        borderRadius: '$5',
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
  name: 'ButtonText',
  context: ButtonContext,
  color: '$color',
  userSelect: 'none',
  fontWeight: '$7',
  fontSize: '$2',

  variants: {
    variant: {
      contained: {
        color: '#fff',
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
        fontSize: '$1',
      },
      md: {
        fontSize: '$2',
      },
      lg: {
        fontSize: '$3',
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
