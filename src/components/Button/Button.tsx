import { NamedExoticComponent } from 'react'
import Text from '@/components/base/Text'
import type { IconProps } from '@tamagui/helpers-icon'
import { createStyledContext, Spinner, styled, View, withStaticProperties } from 'tamagui'

export const ButtonContext = createStyledContext({
  pop: false,
  disabled: false,
  loading: false,
  'data-testid': 'Button',
})

export const ButtonFrameStyled = styled(View, {
  context: ButtonContext,
  animation: 'quick',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
  alignSelf: 'flex-start',
  gap: 6,
  paddingHorizontal: 12,
  borderRadius: '$12',
  cursor: 'pointer',
  borderWidth: 1.2,
  borderColor: 'transparent',
  backgroundColor: '$background',
  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },
  pressStyle: {
    backgroundColor: '$backgroundPress',
  },

  disabledStyle: {
    opacity: 0.3,
    cursor: 'not-allowed',
    backgroundColor: '$background',
  },

  variants: {
    full: {
      true: {
        width: '100%',
      },
    },
    pop: {
      true: {},
    },
    loading: {
      true: {
        pointerEvents: 'none',
        cursor: 'wait',
      },
    },
    size: {
      sm: {
        height: 32,

        gap: 4,
      },
      md: {
        height: 36,
        gap: 6,
      },
      lg: {
        height: 40,
        gap: 8,
      },
      xl: {
        height: 44,

        gap: 10,
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

const ContainedFrame = styled(ButtonFrameStyled, {
  name: 'VoxButtonContained',
})

const OutlinedFrame = styled(ButtonFrameStyled, {
  name: 'VoxButtonOutlined',
  borderColor: '$borderColor',
  hoverStyle: {
    borderColor: '$borderColorHover',
    backgroundColor: '$backgroundHover',
  },
})

const TextFrame = styled(ButtonFrameStyled, {
  name: 'VoxButtonText',
})

const SoftFrame = styled(ButtonFrameStyled, {
  name: 'VoxButtonSoft',
})

const getFrame = (variant?: 'outlined' | 'text' | 'soft' | 'contained') => {
  switch (variant) {
    case 'outlined':
      return OutlinedFrame
    case 'text':
      return TextFrame
    case 'soft':
      return SoftFrame
    case 'contained':
    default:
      return ContainedFrame
  }
}

const ButtonFrame = ({ variant, ...props }: React.ComponentProps<typeof ButtonFrameStyled> & { variant?: 'outlined' | 'text' | 'soft' | 'contained' }) => {
  const Frame = getFrame(variant)

  return <Frame {...props} />
}

const ButtonSpinner = styled(Spinner, {
  color: '$color',
})

export const ButtonText = styled(Text.MD, {
  context: ButtonContext,
  color: '$color',
  userSelect: 'none',
  semibold: true,

  '$group-hover': {
    color: '$colorHover',
  },
  '$group-press': {
    color: '$colorPress',
  },

  variants: {
    pop: {
      true: {
        color: '$colorPop',
      },
    },
  } as const,
})

const Button = withStaticProperties(ButtonFrame, {
  Props: ButtonContext.Provider,
  Text: ButtonText,
})

export default Button

type VoxButtonProps = {
  iconLeft?: NamedExoticComponent<IconProps>
  loading?: boolean
  children?: string[] | string
} & React.ComponentProps<typeof Button>

export const VoxButton = (props: VoxButtonProps) => {
  const outlinedExeption =
    props.variant === 'outlined' && (props.theme === 'gray' || !props.theme)
      ? {
          borderColor: '$textOutline32',
        }
      : {}
  return (
    <Button {...props} theme={props.theme ?? 'gray'} group {...outlinedExeption}>
      {props.iconLeft && (
        <props.iconLeft
          size={16}
          color={props.pop ? '$colorPop' : '$color'}
          $group-hover={{
            color: '$colorHover',
          }}
          $group-press={{
            color: '$colorPress',
          }}
        />
      )}
      {props.children && <ButtonText pop={props.pop}>{props.children}</ButtonText>}
      {props.loading && <ButtonSpinner size="small" />}
    </Button>
  )
}
