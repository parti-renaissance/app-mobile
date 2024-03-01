/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { Platform, StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native'
import { I18nextProvider } from 'react-i18next'
import type { AuthenticatedRootNavigatorParamList } from './src/navigation/authenticatedRoot/AuthenticatedRootNavigatorParamList'
import { deeplinkConfiguration } from './src/navigation/deeplink/deeplinkConfiguration'
import Navigator from './src/navigation/Navigator'
import { Colors } from './src/styles'
import { Analytics } from './src/utils/Analytics'
import { ErrorMonitor } from './src/utils/ErrorMonitor'
import i18n from './src/utils/i18n'
import { PushNotification } from './src/utils/PushNotification'
import { SendDoorToDoorPollAnswersJobWorker } from './src/workers/SendDoorToDoorPollAnswsersJobWorker'

// Must be outside component lifecycle
PushNotification.setUp()

ErrorMonitor.configure()

const App = () => {
  const setStatusBarStyle = () => {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 23) {
        StatusBar.setBarStyle('dark-content')
        StatusBar.setBackgroundColor(Colors.defaultBackground)
      } else {
        StatusBar.setTranslucent(true)
      }
    } else {
      StatusBar.setBarStyle('dark-content')
    }
  }

  useEffect(() => {
    setStatusBarStyle()
  }, [])

  useEffect(() => {
    async function startPollAnswerJobWorker() {
      const worker = await SendDoorToDoorPollAnswersJobWorker.getInstance()
      worker.start()
    }
    startPollAnswerJobWorker()
  }, [])

  const routeNameRef = React.useRef<string>()
  const navigationRef =
    createNavigationContainerRef<AuthenticatedRootNavigatorParamList>()

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          const initialScreen = navigationRef.getCurrentRoute()?.name
          if (initialScreen !== undefined) {
            routeNameRef.current = initialScreen
            Analytics.logScreen(initialScreen)
          }
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current
          const currentRouteName = navigationRef.getCurrentRoute()?.name

          if (currentRouteName && previousRouteName !== currentRouteName) {
            Analytics.logScreen(currentRouteName)
          }

          // Save the current route name for later comparision
          routeNameRef.current = currentRouteName
        }}
        linking={deeplinkConfiguration}
      >
        <I18nextProvider i18n={i18n}>
          <Navigator />
        </I18nextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default ErrorMonitor.wrap(App)
