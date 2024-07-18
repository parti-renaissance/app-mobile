import { ActionIcon, DoorIcon, EventIcon, HomeIcon, RipostIcon, ToolsIcon } from '@/assets/icons/nav'

export type TabRoute = {
  name: '(home)' | 'evenements' | 'actions' | 'news' | 'ressources' | 'porte-a-porte'
  screenName: string
  icon: typeof HomeIcon
  gradiant: string[]
  hidden?: boolean
  href?: string
  labelColor?: string
}

export const ROUTES: TabRoute[] = [
  {
    name: '(home)',
    screenName: 'Mon fil',
    href: '/',
    icon: HomeIcon,
    gradiant: ['#8D98FF', '#8050E6'],
    labelColor: '#8050E6',
  },
  {
    name: 'evenements',
    screenName: 'Événements',
    icon: EventIcon,
    gradiant: ['#52ABFB', '#0868E7'],
    labelColor: '#0868E7',
  },
  {
    name: 'actions',
    screenName: 'Actions',
    icon: ActionIcon,
    gradiant: ['#68F984', '#06B827'],
    labelColor: '#06B827',
  },
  {
    name: 'porte-a-porte',
    screenName: 'Porte à Porte',
    icon: DoorIcon,
    gradiant: ['#F7681E', '#FDA302'],
    labelColor: '#F7681E',
  },
  {
    name: 'ressources',
    screenName: 'Ressources',
    icon: ToolsIcon,
    gradiant: ['#E461E8', '#8B2DBF'],
    labelColor: '#8B2DBF',
  },
]
