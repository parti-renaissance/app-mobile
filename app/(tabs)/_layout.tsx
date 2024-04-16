import React from 'react'
import { Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import NavBar from '@/components/Header/Header'
import { ROUTES } from '@/config/routes'
import { useSession } from '@/ctx/SessionProvider'
import useInit from '@/hooks/useInit'
import { Tabs } from 'expo-router'
import { isWeb, useMedia, View } from 'tamagui'

const TAB_BAR_HEIGTH = 60

export default function AppLayout() {
  const insets = useSafeAreaInsets()
  const media = useMedia()
  const { session } = useSession()

  useInit()

  return (
    <View style={{ height: isWeb ? '100svh' : '100%' }}>
      <NavBar />
      <Tabs
        initialRouteName="evenements"
        screenOptions={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarButton: (props) => <Pressable {...props} />,
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 2,
            borderTopColor: 'rgba(145, 158, 171, 0.32)',
            display: media.gtSm || !session ? 'none' : 'flex',
            height: TAB_BAR_HEIGTH + insets.bottom,
          },
        }}
      >
        {ROUTES.map((route) => (
          <Tabs.Screen
            key={route.name}
            name={route.name}
            options={{
              href: route.hidden === true ? null : undefined,
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
