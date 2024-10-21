import { Platform, SafeAreaView as RNSafeAreaView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Text from '@/components/base/Text'
import { ROUTES } from '@/config/routes'
import { Link, usePathname } from 'expo-router'
import { styled, ThemeableStack, withStaticProperties } from 'tamagui'

const SAV = Platform.OS !== 'ios' ? SafeAreaView : RNSafeAreaView
const SAVProps: any = Platform.OS !== 'ios' ? { edges: ['bottom'] } : {}

const TabFrame = styled(ThemeableStack, {
  tag: 'button',
  paddingHorizontal: 4,
  flexDirection: 'column',
  gap: 7,
  borderTopWidth: 2,
  justifyContent: 'center',
  alignItems: 'center',
  height: 54,
  pressStyle: {
    opacity: 0.5,
    scale: 0.95,
  },

  variants: {
    active: {
      true: {
        color: 'primary',
        borderBottom: '2px solid',
        borderColor: '$color5',
      },
      false: {
        color: 'text',
        borderBottom: '2px solid',
        borderColor: 'transparent',
      },
    },
  },
})

const TabBarFrame = styled(ThemeableStack, {
  flexDirection: 'row',
  borderTopWidth: 1,
  borderColor: '$textOutline20',
  justifyContent: 'space-between',
  paddingHorizontal: 22,
  backgroundColor: 'white',
})

const TabBar = withStaticProperties(TabBarFrame, {
  Tab: TabFrame,
})

const TabBarNav = () => {
  const pathname = usePathname()

  return (
    <SAV {...SAVProps} style={{ backgroundColor: 'white' }}>
      <TabBar>
        {ROUTES.map((route) => {
          const isIndex = route.name === '(home)'
          const isActive = pathname.includes(route.name) || (isIndex && pathname === '/')
          const activeColor = isActive && route.theme !== 'gray' ? '$color5' : '$textPrimary'

          return (
            <Link href={`/(tabs)/${route.name}`} asChild>
              <TabBar.Tab key={route.name} active={isActive} theme={route.theme}>
                <route.icon size={16} color={activeColor} />
                <Text.XSM semibold color={activeColor}>
                  {route.screenName}
                </Text.XSM>
              </TabBar.Tab>
            </Link>
          )
        })}
      </TabBar>
    </SAV>
  )
}

export default TabBarNav
