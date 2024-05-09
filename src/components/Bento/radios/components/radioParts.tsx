import { styled, View } from 'tamagui'

export const Card = styled(View, {
  name: 'VoxRadio',
  animation: 'bouncy',
  variants: {
    unstyled: {
      false: {
        justifyContent: 'center',
        height: '$3',
        cursor: 'pointer',
        width: '100%',
        borderRadius: '$4',
        padding: '$3',
        backgroundColor: '$background',
        borderColor: '$borderColor',
        borderWidth: 1,
        focusStyle: {
          backgroundColor: '$backgroundFocus',
          borderColor: '$borderColorFocus',
        },
        hoverStyle: {
          backgroundColor: '$backgroundHover',
          borderColor: '$borderColorHover',
        },
      },
    },
    active: {
      true: {
        color: '$colorFocus',
        hoverStyle: {
          backgroundColor: '$backgroundFocus',
          borderColor: '$borderColorFocus',
        },
        backgroundColor: '$backgroundFocus',
        borderColor: '$borderColorFocus',
      },
    },
  } as const,
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === '1' ? true : false,
  },
})
