import {
  Calendar as CalendarSvg,
  Home as HomeSvg,
  Inbox as InboxSvg,
  Sparkle as SparkleSvg,
  Zap as ZapSvg,
} from '@tamagui/lucide-icons'

export type TabRoute = (typeof ROUTES)[number]

export const ROUTES = [
  {
    name: 'home',
    screenName: 'Fil',
    icon: HomeSvg,
    gradiant: ['#8D98FF', '#8050E6'],
  },
  {
    name: 'news',
    screenName: 'Événements',
    icon: CalendarSvg,
    gradiant: ['#52ABFB', '#0868E7'],
  },
  {
    name: 'actions',
    screenName: 'Actions',
    icon: ZapSvg,
    gradiant: ['#68F984', '#06B827'],
  },
  {
    name: 'events',
    screenName: 'Ripostes',
    icon: SparkleSvg,
    gradiant: ['#FDA302', '#F7681E'],
  },
  {
    name: 'tools',
    screenName: 'Ressources',
    icon: InboxSvg,
    gradiant: ['#E461E8', '#8B2DBF'],
  },
] as const
