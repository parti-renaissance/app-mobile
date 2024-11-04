import { IconProps } from '@tamagui/helpers-icon'
import { CircleUser, HelpingHand, KeyRound, LandPlot, MessageCircle, Settings2, TreeDeciduous } from '@tamagui/lucide-icons'

export type PageConfig = {
  title: string
  icon: React.NamedExoticComponent<IconProps>
}

export const pageConfigs: {
  [key: string]: PageConfig
} = {
  index: {
    title: 'Mon profil',
    icon: CircleUser,
  },
  'cotisations-et-dons': {
    title: 'Cotisations et dons',
    icon: HelpingHand,
  },
  'mes-instances': {
    title: 'Mes instances',
    icon: LandPlot,
  },
  'informations-personnelles': {
    title: 'Informations personnelles',
    icon: Settings2,
  },
  communications: {
    title: 'Communications',
    icon: MessageCircle,
  },
  'informations-elu': {
    title: 'Informations élu',
    icon: TreeDeciduous,
  },
  'mot-de-passe': {
    title: 'Mot de passe',
    icon: KeyRound,
  },

  // certification: {
  //   title: 'Certification',
  //   icon: BadgeCheck,
  // },
}
