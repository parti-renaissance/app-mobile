import { createDoubleIcon } from '@/components/utils'
import { Circle, Diamond, Triangle } from '@tamagui/lucide-icons'

export const DoubleCircle = createDoubleIcon({ icon: Circle })
export const DoubleDiamond = createDoubleIcon({ icon: Diamond })
export const DoubleTriangle = createDoubleIcon({ icon: Triangle, middleIconOffset: 2.5 })
