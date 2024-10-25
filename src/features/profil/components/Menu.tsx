import Menu from '@/components/menu/Menu'
import { Href, Link, usePathname } from 'expo-router'
import omit from 'lodash/omit'
import { isWeb, useMedia } from 'tamagui'
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
  return (
    <Menu key="profil-menu">
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
  )
}

export default ProfilMenu
