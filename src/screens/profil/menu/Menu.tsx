import { ComponentProps } from 'react'
import Text from '@/components/base/Text'
import Menu from '@/components/menu/Menu'
import clientEnv from '@/config/clientEnv'
import { BadgeCheck, CircleUser, HelpingHand, KeyRound, Mail, MessageCircle, PlusCircle, Settings2, TreeDeciduous } from '@tamagui/lucide-icons'
import { nativeBuildVersion } from 'expo-application'
import Constants from 'expo-constants'
import { Href, Link, usePathname } from 'expo-router'
import { isWeb, useMedia, YStack } from 'tamagui'

export const menuData: Array<ComponentProps<typeof Menu.Item> & { pathname?: Href<string> }> = [
  // {
  //   icon: PlusCircle,
  //   children: 'Accès cadre',
  // },
  {
    icon: HelpingHand,
    children: 'Cotisations et dons',
    pathname: '/profil/cotisation-et-dons',
  },
  {
    icon: Settings2,
    children: 'Informations personnelles',
    pathname: '/profil/informations-personnelles',
  },
  {
    icon: TreeDeciduous,
    children: "Informations d'élu",
    pathname: '/profil/informations-elu',
  },
  // {
  //   icon: Mail,
  //   children: 'Adresse email',
  // },
  {
    icon: MessageCircle,
    children: 'Communications',
    pathname: '/profil/communications',
  },
  {
    icon: KeyRound,
    children: 'Mot de passe',
    pathname: '/profil/mot-de-passe',
  },
  // {
  //   icon: BadgeCheck,
  //   children: 'Certification du profil',
  // },
]

const ProfilMenu = () => {
  const media = useMedia()
  const pathname = usePathname()
  const itemsData = media.gtSm
    ? [
        {
          icon: CircleUser,
          children: 'Mon Profil',
          pathname: '/profil',
        } as const,
        ...menuData,
      ]
    : menuData
  return (
    <Menu key="profil-menu">
      {itemsData.map((item, index) => (
        <Link asChild={!isWeb} href={item.pathname ?? '/profil'} key={index} replace={media.gtSm}>
          <Menu.Item
            key={index}
            active={item.pathname === pathname}
            size={media.sm ? 'lg' : 'sm'}
            showArrow={media.sm}
            icon={item.icon}
            last={index === menuData.length - 1}
          >
            {item.children}
          </Menu.Item>
        </Link>
      ))}
    </Menu>
  )
}

export default ProfilMenu
