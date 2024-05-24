import React from 'react'
import { Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Text from '@/components/base/Text'
import WaitingScreen from '@/components/WaitingScreen'
import { ROUTES } from '@/config/routes'
import { useSession } from '@/ctx/SessionProvider'
import useInit from '@/hooks/useInit'
import { parse, useURL } from 'expo-linking'
import { Tabs, useGlobalSearchParams, useSegments } from 'expo-router'
import { isWeb, useMedia, View } from 'tamagui'

const TAB_BAR_HEIGTH = 80

export default function AppLayout() {
  const insets = useSafeAreaInsets()
  const media = useMedia()
  const { session, signIn, isAuth, isLoading } = useSession()

  const { code } = useGlobalSearchParams<{ code?: string }>()
  const url = useURL()

  useInit()

  const segments = useSegments()
  const getTabBarVisibility = () => {
    const hideOnScreens = ['tunnel', 'building-detail', 'polls'] // put here name of screen where you want to hide tabBar
    return hideOnScreens.map((screen) => segments.includes(screen)).some(Boolean)
  }

  if (!isAuth && !isLoading && (code || url)) {
    if (isWeb && code) {
      signIn({ code })
      return <WaitingScreen />
    }
    if (url && !isWeb) {
      const { queryParams } = parse(url)
      const code = queryParams?.code as string | undefined

      if (code) {
        signIn({ code })
        return <WaitingScreen />
      }
    }
  }

  return (
    <View style={{ height: isWeb ? '100svh' : '100%' }}>
      <Tabs
        initialRouteName={isAuth ? '(home)' : 'evenements'}
        screenOptions={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarLabelPosition: 'below-icon',
          tabBarButton: (props) => <Pressable {...props} />,
          tabBarHideOnKeyboard: true,
          headerShadowVisible: false,
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            shadowOffset: { width: 0, height: 0 },
            elevation: 0,
            borderTopColor: 'rgba(145, 158, 171, 0.2)',
            display: media.gtSm || !session || getTabBarVisibility() ? 'none' : 'flex',
            height: TAB_BAR_HEIGTH + insets.bottom,
            alignContent: 'center',
            justifyContent: 'center',
            padding: 0,
            paddingTop: 15,
          },

          tabBarItemStyle: {
            paddingBottom: 20,
            // paddingTop: 0,
          },
        }}
      >
        {ROUTES.map((route) => (
          <Tabs.Screen
            key={route.name}
            name={route.name}
            options={{
              href: route.hidden === true ? null : undefined,
              title: route.screenName,
              tabBarLabel: ({ focused }) => (
                <Text color={focused ? route.labelColor : '$textSecondary'} fontWeight={focused ? '$6' : '$5'} fontSize={10} allowFontScaling={false}>
                  {route.screenName}
                </Text>
              ),
              tabBarActiveTintColor: route.labelColor,
              tabBarIcon: ({ focused }) => {
                const Icon = ({ focused }) => <route.icon active={focused} />

                return (
                  <View>
                    <Icon focused={focused} />
                  </View>
                )
              },
            }}
          />
        ))}
        <Tabs.Screen name="profil" options={{ href: null }} />
      </Tabs>
    </View>
  )
}
