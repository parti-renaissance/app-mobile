import { ActionIcon, EventIcon, HomeIcon, RipostIcon, ToolsIcon } from '@/assets/icons/nav'

export type TabRoute = {
  name: '(home)' | 'evenements' | 'actions' | 'news' | 'ressources'
  screenName: string
  icon: typeof HomeIcon
  gradiant: string[]
  hidden?: boolean
}

export const ROUTES = [
  {
    name: '(home)',
    screenName: 'Fil',
    href: '/',
    icon: HomeIcon,
    gradiant: ['#8D98FF', '#8050E6'],
  },
  {
    name: 'evenements',
    screenName: 'Événements',
    icon: EventIcon,
    gradiant: ['#52ABFB', '#0868E7'],
  },
  {
    name: 'actions',
    screenName: 'Actions',
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
    name: 'ressources',
    screenName: 'Ressources',
    icon: ToolsIcon,
    gradiant: ['#E461E8', '#8B2DBF'],
  },
] satisfies TabRoute[]
