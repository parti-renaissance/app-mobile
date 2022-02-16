import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { Screen } from '.'
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
      <Stack.Screen name={Screen.profile} component={ProfileScreen} />
      <Stack.Screen name={Screen.profileLogin} component={ProfilLoginScreen} />
      <Stack.Screen
        name={Screen.profileTermsOfUse}
        component={ProfileTermsOfUseScreen}
      />
      <Stack.Screen
        name={Screen.profileDataProtection}
        component={ProfileDataProtectionScreen}
      />
      <Stack.Screen
        name={Screen.profileZipCode}
        component={ProfileZipCodeScreen}
        options={{ title: i18n.t('profileZipCode.title') }}
      />
      <Stack.Screen
        name={Screen.personalInformation}
        component={PersonalInformationScreen}
      />
      <Stack.Screen
        name={Screen.centerOfInterest}
        component={CenterOfInterestScreen}
        options={{ title: i18n.t('centerofinterest.title') }}
      />
      <Stack.Screen
        name={Screen.notificationMenu}
        component={NotificationMenuScreen}
        options={{ title: i18n.t('notificationmenu.title') }}
      />
      <Stack.Screen
        name={Screen.notifications}
        component={NotificationsScreen}
      />
    </Stack.Navigator>
  )
}

export default ProfileModalNavigator
