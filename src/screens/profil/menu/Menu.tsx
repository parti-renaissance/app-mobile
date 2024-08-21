import { ComponentProps } from 'react'
import Menu from '@/components/menu/Menu'
import { BadgeCheck, CircleUser, HelpingHand, KeyRound, Mail, MessageCircle, PlusCircle, Settings, TreeDeciduous } from '@tamagui/lucide-icons'
import { Href, Link, usePathname } from 'expo-router'
import { useMedia } from 'tamagui'

const menuData: Array<ComponentProps<typeof Menu.Item> & { pathname?: Href<string> }> = [
  {
    icon: CircleUser,
    children: 'Mon Profil',
    pathname: '/profil',
  },
  {
    icon: PlusCircle,
    children: 'Accès cadre',
  },
  {
    icon: HelpingHand,
    children: 'Cotisation et dons',
    pathname: '/profil/cotisation-et-dons',
  },
  {
    icon: Settings,
    children: 'Information personnelles',
    pathname: '/profil/informations-personnelles',
  },
  {
    icon: TreeDeciduous,
    children: "Information d'élu",
  },
  {
    icon: Mail,
    children: 'Adresse email',
  },
  {
    icon: MessageCircle,
    children: 'Préference de notification',
  },
  {
    icon: KeyRound,
    children: 'Mot de passe',
  },
  {
    icon: BadgeCheck,
    children: 'Certification du profil',
  },
]

const ProfilMenu = () => {
  const media = useMedia()
  const pathname = usePathname()
  return (
    <Menu key="profil-menu">
      {menuData.map((item, index) => (
        <Link href={item.pathname ?? '/profil'} key={index}>
          <Menu.Item active={item.pathname === pathname} size={media.gtMd ? 'sm' : 'lg'} icon={item.icon} last={index === menuData.length - 1}>
            {item.children}
          </Menu.Item>
        </Link>
      ))}
    </Menu>
  )
}

export default ProfilMenu
