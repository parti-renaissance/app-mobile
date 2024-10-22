import React, { useRef } from 'react'
import { LayoutChangeEvent, LayoutRectangle, Platform, SafeAreaView as RNSafeAreaView, StyleSheet } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withClamp, withSpring, withTiming } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import Text from '@/components/base/Text'
import { BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { getThemes, styled, ThemeableStack, ThemeName, useTheme, withStaticProperties, YStack } from 'tamagui'

const SAV = Platform.OS !== 'ios' ? SafeAreaView : RNSafeAreaView
const SAVProps: any = Platform.OS !== 'ios' ? { edges: ['bottom'] } : {}

const indicatorStyle = StyleSheet.create({
  indicator: {
    height: 54,
    width: 54,
    position: 'absolute',
    borderRadius: 999,
    top: 4,
  },
})

const TabFrame = styled(ThemeableStack, {
  tag: 'button',
  paddingHorizontal: 4,
  flexDirection: 'column',
  gap: 7,
  borderRadius: 999,
  justifyContent: 'center',
  alignItems: 'center',
  height: 54,
})

const TabBarFrame = styled(ThemeableStack, {
  flexDirection: 'row',
  borderTopWidth: 1,
  borderColor: '$textOutline20',
  justifyContent: 'space-between',
  paddingHorizontal: 22,
  backgroundColor: 'white',
  alignItems: 'center',
  height: 60,
})

const TabBar = withStaticProperties(TabBarFrame, {
  Tab: TabFrame,
})

type TabProps = {
  route: BottomTabBarProps['state']['routes'][number]
  isFocus: boolean
  onPress: () => void
  options: BottomTabNavigationOptions & { tabBarTheme?: ThemeName; tabBarVisible?: boolean }
  onLayout: (e: LayoutChangeEvent) => void
}

const Tab = ({ isFocus, options, route, onPress, onLayout }: TabProps) => {
  const scale = useSharedValue(0)

  React.useEffect(() => {
    scale.value = withTiming(isFocus ? 1 : 0, { duration: 100 })
  }, [isFocus])

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(scale.value, [0, 1], [1, 1.334]) }, { translateY: interpolate(scale.value, [0, 1], [0, 7]) }],
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scale.value, [0, 1], [1, 0]),
    }
  })

  const activeColor = (isFocus ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor) ?? 'black'
  const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name
  const tabBarIcon = options.tabBarIcon ? (
    <Animated.View style={[animatedIconStyle]}>
      <options.tabBarIcon color={activeColor} size={16} focused={isFocus} />
    </Animated.View>
  ) : null
  return (
    <TabBar.Tab theme={options.tabBarTheme} onPress={onPress} group onLayout={onLayout}>
      {tabBarIcon}
      <Animated.View style={[animatedTextStyle]}>
        <Text.XSM semibold color={activeColor}>
          {label}
        </Text.XSM>
      </Animated.View>
    </TabBar.Tab>
  )
}
const MemoTab = React.memo(Tab)

const TabBarNav = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps & {
  descriptors: BottomTabBarProps['descriptors'] & {
    [key: string]: { options: BottomTabNavigationOptions & { tabBarTheme?: ThemeName; tabBarVisible?: boolean } }
  }
}) => {
  const filteredRoutes = React.useMemo(
    () =>
      state.routes.filter((route) => {
        const { options } = descriptors[route.key]
        return options.tabBarVisible === true || options.tabBarVisible === undefined
      }),
    [state.routes, descriptors],
  )

  const layoutsByKey = useRef(new Map<string, LayoutRectangle>())
  const getPosition = (layout: LayoutRectangle) => {
    return layout.x + layout?.width / 2 - 27
  }

  const getPositionFromKey = (routeKey: string) => {
    const layout = layoutsByKey.current.get(routeKey)
    if (!layout) return 0
    return getPosition(layout)
  }
  const themes = getThemes()
  const tabTheme = descriptors[state.routes[state.index].key].options.tabBarTheme ?? 'gray'
  const activeColorValue = themes.light[`${tabTheme}1`].val

  const position = useSharedValue(0)
  const activeColor = useSharedValue(activeColorValue)

  React.useEffect(() => {
    activeColor.value = activeColorValue
  }, [activeColorValue])

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: position.value }],
      backgroundColor: activeColor.value,
    }
  })

  const handleSaveLayout = (key: string) => (e: LayoutChangeEvent) => {
    if (layoutsByKey.current) {
      if (key === state.routes[state.index].key) {
        position.value = getPosition(e.nativeEvent.layout)
      }
      layoutsByKey.current.set(key, e.nativeEvent.layout)
    }
  }
  return (
    <SAV {...SAVProps} style={{ backgroundColor: 'white' }}>
      <TabBar>
        <Animated.View style={[indicatorStyle.indicator, indicatorAnimatedStyle]} />
        {filteredRoutes.map((route, index) => {
          const { options } = descriptors[route.key]
          const isFocus = state.index === index
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })
            position.value = withSpring(getPositionFromKey(route.key), { duration: 2000 })

            if (!isFocus && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          return <MemoTab onLayout={handleSaveLayout(route.key)} key={route.name} route={route} isFocus={isFocus} onPress={onPress} options={options} />
        })}
      </TabBar>
    </SAV>
  )
}

export default TabBarNav
