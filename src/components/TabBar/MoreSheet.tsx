import React, { forwardRef, useCallback, useMemo, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useForwardRef } from '@/hooks/useForwardRef'
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet'
import Menu from '../menu/Menu'
import { TabBarNavProps } from './types'

const MoreSheet = forwardRef<
  BottomSheet,
  {
    onClose?: () => void
    navProps: {
      state: TabBarNavProps['state']
      descriptors: TabBarNavProps['descriptors']
      navigation: TabBarNavProps['navigation']
      mainNavLength: number
    }
  }
>(({ onClose, navProps }, bottomSheetRef) => {
  const insets = useSafeAreaInsets()
  const ref = useForwardRef(bottomSheetRef)
  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />, [])
  return (
    <GestureHandlerRootView style={[styles.container, { bottom: 54 + insets.bottom + 5 }]}>
      <BottomSheet ref={ref} index={-1} backdropComponent={renderBackdrop} onClose={onClose}>
        <BottomSheetView style={styles.contentContainer}>
          <Menu bg="red">
            {navProps.state.routes.map((route, index) => {
              const { options } = navProps.descriptors[route.key]
              const label = options.tabBarLabel ?? options.title ?? route.name
              return (
                <Menu.Item
                  key={route.key}
                  size="lg"
                  showArrow
                  active={navProps.state.index === index + navProps.mainNavLength}
                  // @ts-expect-error icon is not in the type
                  icon={options.tabBarIcon}
                  onPress={() => {
                    navProps.navigation.navigate(route.name)
                    ref.current?.close()
                  }}
                >
                  {label}
                </Menu.Item>
              )
            })}
          </Menu>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    pointerEvents: 'box-none',
    top: 0,
    left: 0,
    right: 0,
    bottom: 54,
  },
  contentContainer: {
    width: '100%',
  },
})

export default MoreSheet
