import { config as configBase } from '@tamagui/config/v3'
import { createTamagui , createFont} from 'tamagui'
import { themes } from './themes'
import { Maax, PublicSans } from './theme/fonts'

export const config = createTamagui({ ...configBase, themes, defaultFont: "PublicSans", fonts:{ ...configBase.fonts, Maax, PublicSans },
 })

export default config

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
