import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { headerBlank } from '../styles/navigationAppearance'
import i18n from '../utils/i18n'
import CenterOfInterestScreen from '../screens/personalInformation/centerinterest/CenterOfInterestScreen'
import NotificationMenuScreen from '../screens/personalInformation/notifications/NotificationMenuScreen'
import NotificationsScreen from '../screens/personalInformation/notifications/NotificationsScreen'
import PersonalInformationScreen from '../screens/personalInformation/PersonalInformationScreen'
import ProfileDataProtectionScreen from '../screens/profile/ProfileDataProtectionScreen'
import ProfilLoginScreen from '../screens/profile/ProfileLoginScreen'
import ProfileScreen from '../screens/profile/ProfileScreen'
import ProfileTermsOfUseScreen from '../screens/profile/ProfileTermsOfUseScreen'
import ProfileZipCodeScreen from '../screens/profile/ProfileZipCodeScreen'
import { NotificationCategory } from '../core/entities/Notification'
import { CompositeScreenProps } from '@react-navigation/native'
import { AuthenticatedRootNavigatorScreenProps } from './AuthenticatedRootNavigator'

export type ProfileModalNavigatorParamList = {
  Profile: undefined
  ProfileLogin: undefined
  ProfileZipCode: { zipCode: string }
  ProfileTermsOfUse: undefined
  ProfileDataProtection: undefined
  PersonalInformation: undefined
  CenterOfInterest: undefined
  NotificationMenu: undefined
  Notifications: { category: NotificationCategory }
}

export type ProfileModalNavigatorScreenProps<
  T extends keyof ProfileModalNavigatorParamList
> = CompositeScreenProps<
  StackScreenProps<ProfileModalNavigatorParamList, T>,
  AuthenticatedRootNavigatorScreenProps
>

const Stack = createStackNavigator<ProfileModalNavigatorParamList>()

const ProfileModalNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen name={'Profile'} component={ProfileScreen} />
      <Stack.Screen name={'ProfileLogin'} component={ProfilLoginScreen} />
      <Stack.Screen
        name={'ProfileTermsOfUse'}
        component={ProfileTermsOfUseScreen}
      />
      <Stack.Screen
        name={'ProfileDataProtection'}
        component={ProfileDataProtectionScreen}
      />
      <Stack.Screen
        name={'ProfileZipCode'}
        component={ProfileZipCodeScreen}
        options={{ title: i18n.t('profileZipCode.title') }}
      />
      <Stack.Screen
        name={'PersonalInformation'}
        component={PersonalInformationScreen}
      />
      <Stack.Screen
        name={'CenterOfInterest'}
        component={CenterOfInterestScreen}
        options={{ title: i18n.t('centerofinterest.title') }}
      />
      <Stack.Screen
        name={'NotificationMenu'}
        component={NotificationMenuScreen}
        options={{ title: i18n.t('notificationmenu.title') }}
      />
      <Stack.Screen name={'Notifications'} component={NotificationsScreen} />
    </Stack.Navigator>
  )
}

export default ProfileModalNavigator
