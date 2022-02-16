import React, { FunctionComponent } from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { headerOptions } from '../styles/navigationAppearance'
import { Screen } from '.'
import PhonePollDetailScreen from '../screens/phonePollDetail/PhonePollDetailScreen'
import PhonePollDetailSuccessScreen from '../screens/phonePollDetailSuccess/PhonePollDetailSuccessScreen'
import PhoningSessionLoaderScreen from '../screens/phoningSessionLoader/PhoningSessionLoaderScreen'
import PhoningSessionNumberFoundScreen from '../screens/phoningSessionNumberFound/PhoningSessionNumberFoundScreen'
import PhoneCallStatusPickerScreen from '../screens/phoneCallStatusPicker/PhoneCallStatusPickerScreen'
import PhoneCallFailureScreen from '../screens/phoneCallFailure/PhoneCallFailureScreen'
import PhoningSessionNoNumberAvailableScreen from '../screens/phoningSessionNoNumberAvailable/PhoningSessionNoNumberAvailableScreen'
import PhoningSessionNumberFoundOtherDeviceScreen from '../screens/phoningSessionNumberFoundOtherDevice/PhoningSessionNumberFoundOtherDeviceScreen'
import PhoningSessionLoaderPermanentCampaignScreen from '../screens/phoningSessionLoaderPermanentCampaign/PhoningSessionLoaderPermanentCampaignScreen'
import {
  PhoningSessionDevice,
  PhoningSessionNavigationData,
  PhoningSessionNavigationDataRequiredAdherent,
} from '../screens/shared/PhoningSessionNavigationData'
import { CompositeScreenProps } from '@react-navigation/native'
import { AuthenticatedRootNavigatorScreenProps } from './AuthenticatedRootNavigator'

export type PhoningSessionModalNavigatorParamList = {
  PhoningSessionLoader: {
    campaignId: string
    campaignTitle: string
    device: PhoningSessionDevice
  }
  PhoningSessionLoaderPermanentCampaign: {
    campaignId: string
    campaignTitle: string
  }
  PhoningSessionNumberFound: {
    data: PhoningSessionNavigationDataRequiredAdherent
  }
  PhoningSessionNumberFoundOtherDevice: {
    data: PhoningSessionNavigationDataRequiredAdherent
  }
  PhoningSessionNoNumberAvailable: { message: string }
  PhoneCallStatusPicker: { data: PhoningSessionNavigationDataRequiredAdherent }
  PhoneCallFailure: { data: PhoningSessionNavigationData }
  PhonePollDetail: { data: PhoningSessionNavigationData }
  PhonePollDetailSuccess: { data: PhoningSessionNavigationData; title: string }
}

export type PhoningSessionModalNavigatorScreenProps<
  T extends keyof PhoningSessionModalNavigatorParamList
> = CompositeScreenProps<
  StackScreenProps<PhoningSessionModalNavigatorParamList, T>,
  AuthenticatedRootNavigatorScreenProps
>

const Stack = createStackNavigator<PhoningSessionModalNavigatorParamList>()

const PhoningSessionModal: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name={Screen.phonePollDetail}
        component={PhonePollDetailScreen}
        options={{ headerLeft: () => null, title: '' }}
      />
      <Stack.Screen
        name={Screen.phoningSessionLoaderPermanentCampaign}
        component={PhoningSessionLoaderPermanentCampaignScreen}
        options={{ headerLeft: () => null, title: '' }}
      />
      <Stack.Screen
        name={Screen.phonePollDetailSuccess}
        component={PhonePollDetailSuccessScreen}
        options={{ headerLeft: () => null, title: '' }}
      />
      <Stack.Screen
        name={Screen.phoningSessionLoader}
        component={PhoningSessionLoaderScreen}
        options={{ headerLeft: () => null, title: '' }}
      />
      <Stack.Screen
        name={Screen.phoningSessionNumberFound}
        component={PhoningSessionNumberFoundScreen}
        options={{ headerLeft: () => null, title: '' }}
      />
      <Stack.Screen
        name={Screen.phoningSessionNumberFoundOtherDevice}
        component={PhoningSessionNumberFoundOtherDeviceScreen}
        options={{ headerLeft: () => null, title: '' }}
      />
      <Stack.Screen
        name={Screen.phoneCallStatusPicker}
        component={PhoneCallStatusPickerScreen}
        options={{ headerLeft: () => null, title: '' }}
      />
      <Stack.Screen
        name={Screen.phoneCallFailure}
        component={PhoneCallFailureScreen}
        options={{ headerLeft: () => null, title: '' }}
      />
      <Stack.Screen
        name={Screen.phoningSessionNoNumberAvailable}
        component={PhoningSessionNoNumberAvailableScreen}
        options={{ headerLeft: () => null, title: '' }}
      />
    </Stack.Navigator>
  )
}

export default PhoningSessionModal
