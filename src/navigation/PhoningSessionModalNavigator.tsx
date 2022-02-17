import React, { FunctionComponent } from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { headerBlank } from '../styles/navigationAppearance'
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
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen
        name={'PhonePollDetail'}
        component={PhonePollDetailScreen}
        options={{ headerLeft: () => null }}
      />
      <Stack.Screen
        name={'PhoningSessionLoaderPermanentCampaign'}
        component={PhoningSessionLoaderPermanentCampaignScreen}
        options={{ headerLeft: () => null }}
      />
      <Stack.Screen
        name={'PhonePollDetailSuccess'}
        component={PhonePollDetailSuccessScreen}
        options={{ headerLeft: () => null }}
      />
      <Stack.Screen
        name={'PhoningSessionLoader'}
        component={PhoningSessionLoaderScreen}
        options={{ headerLeft: () => null }}
      />
      <Stack.Screen
        name={'PhoningSessionNumberFound'}
        component={PhoningSessionNumberFoundScreen}
        options={{ headerLeft: () => null }}
      />
      <Stack.Screen
        name={'PhoningSessionNumberFoundOtherDevice'}
        component={PhoningSessionNumberFoundOtherDeviceScreen}
        options={{ headerLeft: () => null }}
      />
      <Stack.Screen
        name={'PhoneCallStatusPicker'}
        component={PhoneCallStatusPickerScreen}
        options={{ headerLeft: () => null }}
      />
      <Stack.Screen
        name={'PhoneCallFailure'}
        component={PhoneCallFailureScreen}
        options={{ headerLeft: () => null }}
      />
      <Stack.Screen
        name={'PhoningSessionNoNumberAvailable'}
        component={PhoningSessionNoNumberAvailableScreen}
        options={{ headerLeft: () => null }}
      />
    </Stack.Navigator>
  )
}

export default PhoningSessionModal
