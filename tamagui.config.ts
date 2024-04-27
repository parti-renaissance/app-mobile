import { config as configBase, tokens } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui'
import { Maax, PublicSans } from './theme/fonts'
import { themes } from './themes'

export const config = createTamagui({
  ...configBase,
  tokens: {
    ...configBase.tokens,
    size: {
      ...configBase.tokens.size,
      true: tokens.size[2],
    },
  },
  themes,
  defaultFont: 'PublicSans',
  fonts: { ...configBase.fonts, Maax, PublicSans },
})

export default config

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
