import Menu from '@/components/menu/Menu'
import { useSession } from '@/ctx/SessionProvider'
import { useUserStore } from '@/store/user-store'
import { LogOut } from '@tamagui/lucide-icons'
import { Href, Link, usePathname } from 'expo-router'
import omit from 'lodash/omit'
import { isWeb, useMedia, YStack } from 'tamagui'
import { pageConfigs } from '../configs'

const mapPageConfigs = (config: typeof pageConfigs) =>
  Object.entries(config).map(
    ([screenName, options]) =>
      ({
        icon: options.icon,
        children: options.title,
        pathname: ('/profil' + (screenName === 'index' ? '' : '/' + screenName)) as Href<string>,
      }) as const,
  )

export const dektopNavConfig = mapPageConfigs(pageConfigs)
export const mobileNavConfig = mapPageConfigs(omit(pageConfigs, ['index']))

const ProfilMenu = () => {
  const media = useMedia()
  const pathname = usePathname()
  const itemsData = media.gtSm ? dektopNavConfig : mobileNavConfig
  const { signOut } = useSession()
  const { user: credentials } = useUserStore()
  return (
    <YStack gap="$medium" key="profil-menu">
      <Menu>
        {itemsData.map((item, index) => (
          <Link asChild={!isWeb} href={item.pathname} key={index} replace={media.gtSm}>
            <Menu.Item
              key={index}
              active={item.pathname === pathname}
              size={media.sm ? 'lg' : 'sm'}
              showArrow={media.sm}
              icon={item.icon}
              last={index === itemsData.length - 1}
            >
              {item.children}
            </Menu.Item>
          </Link>
        ))}
      </Menu>
      <Menu>
        <Menu.Item theme="orange" size={media.sm ? 'lg' : 'sm'} showArrow={media.sm} onPress={signOut} icon={LogOut} last={true}>
          {credentials?.isAdmin ? 'Quitter l’impersonnification' : 'Me déconnecter'}
        </Menu.Item>
      </Menu>
    </YStack>
  )
}

export default ProfilMenu
