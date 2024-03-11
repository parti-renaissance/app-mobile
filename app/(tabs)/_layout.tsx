import React from 'react'
import { Platform, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'
import { Analytics, AnalyticsScreens } from '@/utils/Analytics'
import type { IconProps } from '@tamagui/helpers-icon'
import { Calendar as CalendarSvg, Home as HomeSvg, Inbox as InboxSvg, Sparkle as SparkleSvg, Zap as ZapSvg } from '@tamagui/lucide-icons'
import { Link, Stack as StackRouter, Tabs, usePathname } from 'expo-router'
import { Avatar, Button, Stack, Text, useMedia, View } from 'tamagui'

const IS_WEB = Platform.OS === 'web'
const TAB_BAR_HEIGTH = 60

function SvgComponent(props) {
  return (
    <Svg width={105} height={36} viewBox="0 0 105 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M9.963 30.4c-.721 1.312-2.07 2.107-4.344 2.107-1.035 0-1.978-.185-2.828-.61C1.091 31.082 0 29.474 0 27.017c0-1.22.259-2.237.72-3.105.999-1.7 2.755-2.607 5.01-2.607 1.94 0 3.253.61 4.048 1.904v-5.083h4.325v14.14h-3.881l-.26-1.867zm-2.791-1.258c1.811 0 2.698-.702 2.698-2.144 0-1.515-.998-2.329-2.698-2.329-1.812 0-2.662.814-2.662 2.33 0 1.441.887 2.143 2.662 2.143zM16.056 24.078c1.164-.166 1.682-.518 1.83-1.516-.093 0-.24.019-.37.019-.462 0-.813-.037-1.09-.13-.536-.166-.74-.628-.74-1.645 0-1.441.592-1.885 2.107-1.885 1.608 0 2.126.628 2.126 2.57 0 2.55-1.164 4.029-3.697 4.232l-.166-1.645zM34.662 32.266H21.594V19.013h12.79v3.457h-8.539v1.774h7.634v2.643h-7.634v1.793h8.817v3.586zM44.003 29.77c-.592 1.683-1.904 2.792-4.233 2.792-3.068 0-4.602-1.811-4.602-4.88v-6.136h4.399v4.935c0 1.663.499 2.403 2.088 2.403 1.405 0 2.089-.832 2.089-2.514v-4.824h4.473v10.72h-3.79l-.424-2.495zM49.596 32.266v-10.72h3.752l.537 3.087c.425-2.182 1.681-3.254 4.14-3.254h1.164v4.418h-1.867c-.85 0-1.478.11-1.922.277-.887.388-1.164 1.257-1.164 2.81v3.382h-4.64zM66.564 32.617c-1.7 0-3.087-.221-4.122-.683-2.107-.925-3.013-2.607-3.013-4.936 0-1.164.296-2.162.869-3.03 1.164-1.738 3.346-2.736 6.321-2.736 1.516 0 2.773.24 3.864.702 2.162.961 3.308 2.717 3.308 5.064 0 1.146-.277 2.107-.795 2.958-1.09 1.682-3.179 2.661-6.432 2.661zm.037-3.474c1.885 0 2.699-.758 2.699-2.145 0-1.552-.87-2.329-2.68-2.329-1.775 0-2.68.777-2.68 2.33 0 1.441.886 2.143 2.66 2.143zM83.216 32.507c-2.18 0-3.42-.703-4.122-1.923V36h-4.343V21.546h3.715l.314 1.996c.813-1.405 2.347-2.237 4.51-2.237 1.11 0 2.07.222 2.92.647 1.683.87 2.662 2.551 2.662 5.028 0 1.183-.259 2.162-.795 3.013-1.035 1.626-2.828 2.514-4.86 2.514zm-1.534-3.364c1.904 0 2.699-.758 2.699-2.145 0-1.552-.87-2.329-2.68-2.329-1.738 0-2.68.814-2.68 2.33 0 1.441.887 2.143 2.661 2.143zM103.982 28.847c-.924 2.68-3.253 3.77-7.338 3.77-2.698 0-4.454-.554-5.545-1.552-1.09-.998-1.515-2.33-1.515-3.882a5.98 5.98 0 01.794-3.031c1.091-1.812 3.235-2.92 6.6-2.92 1.626 0 2.957.24 3.992.739 2.107.961 3.105 2.717 3.105 4.972v1.053H93.927c.277 1.073 1.165 1.59 2.995 1.59 1.386 0 1.959-.277 2.31-.74h4.75zm-7.06-4.547c-1.664 0-2.57.536-2.92 1.534h5.655c-.277-1.11-1.127-1.534-2.735-1.534z"
        fill="#212B36"
      />
      <Path
        d="M.573 15.323V2.07H8.3c4.64 0 6.562.98 6.562 3.549v.055c0 1.664-.943 2.44-2.754 2.792 2.181.35 3.124 1.146 3.124 2.975v.037c0 2.828-2.385 3.845-6.747 3.845H.574zM4.991 5.286v2.015h3.142c1.386 0 2.144-.203 2.144-.98v-.037c0-.794-.591-.998-2.2-.998H4.992zm0 4.529v2.144h2.828c.74 0 1.294-.037 1.663-.111.777-.13.998-.425.998-.943v-.037c0-.85-.536-1.053-2.55-1.053H4.99zM30.18 11.903c-.924 2.68-3.253 3.771-7.338 3.771-2.698 0-4.454-.554-5.545-1.553-1.09-.998-1.516-2.328-1.516-3.881a5.98 5.98 0 01.795-3.031c1.09-1.812 3.235-2.92 6.599-2.92 1.626 0 2.957.24 3.992.739 2.107.96 3.106 2.717 3.106 4.972v1.053H20.125c.277 1.072 1.165 1.59 2.994 1.59 1.387 0 1.96-.277 2.31-.74h4.751zm-7.06-4.547c-1.664 0-2.57.537-2.921 1.535h5.656c-.277-1.11-1.128-1.535-2.736-1.535zM37.676 15.674c-4.067 0-6.655-1.053-7.19-3.881h4.713c.314.776 1.072 1.053 2.902 1.053 1.534 0 2.014-.333 2.014-.795 0-.148-.092-.277-.258-.37-.315-.203-1.22-.295-3.124-.369-1.442-.074-2.55-.222-3.42-.444-1.737-.443-2.44-1.293-2.44-2.754 0-2.347 2.07-3.826 6.248-3.826 4.103 0 6.303 1.128 7.153 3.734h-4.491c-.296-.795-1.313-1.035-2.773-1.035-1.552 0-1.96.333-1.96.758 0 .148.093.295.297.388.388.203 1.294.314 2.975.388 1.535.074 2.736.222 3.623.462 1.756.462 2.403 1.33 2.403 2.791 0 .776-.24 1.442-.702 2.033-.924 1.165-2.828 1.867-5.97 1.867zM52.005 15.674c-1.7 0-3.086-.222-4.121-.684-2.108-.924-3.013-2.606-3.013-4.935 0-1.164.295-2.162.868-3.031 1.165-1.738 3.346-2.736 6.322-2.736 1.516 0 2.773.24 3.863.703 2.163.96 3.309 2.717 3.309 5.064 0 1.146-.278 2.107-.795 2.957-1.09 1.682-3.18 2.662-6.433 2.662zm.037-3.475c1.886 0 2.699-.758 2.699-2.144 0-1.553-.869-2.329-2.68-2.329-1.775 0-2.68.776-2.68 2.33 0 1.44.887 2.143 2.661 2.143zM62.485 3.882c-1.848 0-2.588-.5-2.588-1.941C59.897.499 60.803 0 62.485 0s2.606.5 2.606 1.94c0 1.387-.85 1.942-2.606 1.942zm-2.31.757c.073.074.258.148.536.204.536.092 1.256.166 1.756.166.277 0 .554-.018.868-.037.647-.074 1.239-.185 1.405-.333v10.684h-4.565V4.639zM70.59 15.323h-4.472V4.603h3.807l.425 2.402c.666-1.626 2.07-2.717 4.326-2.717 3.105 0 4.787 1.793 4.787 4.898v6.137h-4.436v-4.861c0-1.682-.518-2.496-2.126-2.496-1.663 0-2.31.832-2.31 2.736v4.621z"
        fill="#00AEEF"
      />
    </Svg>
  )
}

type TabRoute = {
  name: string
  screenName: string
  icon: React.NamedExoticComponent<IconProps>
  gradiant?: string[]
}

export const ROUTES: TabRoute[] = [
  {
    name: 'home',
    screenName: 'Fil',
    icon: HomeSvg,
    gradiant: ['#8D98FF', '#8050E6'],
  },
  {
    name: 'news',
    screenName: 'Événements',
    icon: CalendarSvg,
    gradiant: ['#52ABFB', '#0868E7'],
  },
  {
    name: 'actions',
    screenName: 'Actions',
    icon: ZapSvg,
    gradiant: ['#68F984', '#06B827'],
  },
  {
    name: 'events',
    screenName: 'Ripostes',
    icon: SparkleSvg,
    gradiant: ['#FDA302', '#F7681E'],
  },
  {
    name: 'tools',
    screenName: 'Ressources',
    icon: InboxSvg,
    gradiant: ['#E461E8', '#8B2DBF'],
  },
]

const tabBarIcon =
  (pathname: string) =>
  ({ focused }) => {
    const tab = ROUTES.find((route) => route.name === pathname)

    const Icon = ({ focused }) => <tab.icon size={28} color={focused ? tab.gradiant[0] : '#637381'} />

    return (
      <View>
        <Icon focused={focused} />
      </View>
    )
  }

const getScreenname = (route: string): AnalyticsScreens => {
  const tabRoute = ROUTES.find((tabRoute) => tabRoute.name === route)
  return tabRoute?.screenName as AnalyticsScreens
}

export default function AppLayout() {
  const insets = useSafeAreaInsets()
  const pathname = usePathname()
  const media = useMedia()

  React.useEffect(() => {
    Analytics.logNavBarItemSelected(getScreenname(pathname))
  }, [pathname])

  const NavigationWeb = () => {
    const NavBar = () => {
      return (
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          backgroundColor="white"
          borderBottomWidth={2}
          borderBottomColor="rgba(145, 158, 171, 0.32)"
          height={82}
          paddingHorizontal={'$4'}
        >
          <SvgComponent />

          <Stack flexDirection="row" gap={4}>
            {ROUTES.map((route) => {
              const focused = pathname.replace('/', '') === route.name

              return (
                <Link key={route.name} href={`${route.name}` as never}>
                  <Button backgroundColor={'white'} flexDirection="row" justifyContent="center" alignItems="center" gap={2}>
                    <Button.Icon scaleIcon={2}>{tabBarIcon(route.name)({ focused })}</Button.Icon>

                    {media.gtMd && (
                      <Button.Text color={focused ? route.gradiant[0] : 'gray8'} fontWeight={'500'}>
                        {route.screenName}
                      </Button.Text>
                    )}
                  </Button>
                </Link>
              )
            })}
          </Stack>

          <View justifyContent="space-between" alignItems="center">
            <Stack gap={2} flexDirection="column" alignContent="flex-end" alignItems="flex-end">
              <Text fontFamily={'$PublicSans'} color={'gray8'} fontWeight={'500'}>
                Nom Prénom
              </Text>

              <Text fontFamily={'$PublicSans'} fontSize={12} color={'gray5'}>
                #32901A
              </Text>
            </Stack>

            <Avatar circular size="$4">
              <Avatar.Image source={{ uri: 'https://picsum.photos/200/200', width: 200, height: 200 }} />
              <Avatar.Fallback bc="$gray3" />
            </Avatar>
          </View>
        </Stack>
      )
    }

    return (
      <StackRouter
        screenOptions={{
          header: () => <NavBar />,
        }}
      >
        {ROUTES.map((route) => (
          <StackRouter.Screen key={route.name} name={route.name} />
        ))}
      </StackRouter>
    )
  }

  if (IS_WEB) {
    return <NavigationWeb />
  }

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarButton: (props) => <Pressable {...props} />,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 2,
          borderTopColor: 'rgba(145, 158, 171, 0.32)',
          height: TAB_BAR_HEIGTH + insets.bottom,
        },
      }}
    >
      {ROUTES.map((route) => (
        <Tabs.Screen
          key={route.name}
          name={route.name}
          options={{
            tabBarIcon: tabBarIcon(route.name),
          }}
        />
      ))}
    </Tabs>
  )
}
