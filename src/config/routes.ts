import { ActionIcon, EventIcon, HomeIcon, RipostIcon, ToolsIcon } from '@/assets/icons/nav'
import { hi } from 'date-fns/locale'
import { Platform } from 'react-native'
import { isWeb } from 'tamagui'

import { AllRoutes } from 'expo-router'


export type TabRoute = {
  name: 'home' | 'events' | 'actions' | 'news' | 'tools',
  screenName: string
  icon: typeof HomeIcon
  gradiant: string[]
  hidden?: boolean
}


export const ROUTES = [
  {
    name: 'home',
    screenName: 'Fil',
    icon: HomeIcon,
    gradiant: ['#8D98FF', '#8050E6'],
  },
  {
    name: 'events',
    screenName: 'Événements',
    icon: EventIcon,
    gradiant: ['#52ABFB', '#0868E7'],
  },
  {
    name: 'actions',
    screenName: 'Actions',
    hidden: isWeb,
    icon: ActionIcon,
    gradiant: ['#68F984', '#06B827'],
  },
  {
    name: 'news',
    screenName: 'Ripostes',
    hidden: true,
    icon: RipostIcon,
    gradiant: ['#FDA302', '#F7681E'],
  },
  {
    name: 'tools',
    screenName: 'Ressources',
    icon: ToolsIcon,
    gradiant: ['#E461E8', '#8B2DBF'],
  },
]  as TabRoute[]


