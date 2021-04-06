import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { ProfileParamList, Screen } from '../../navigation'
import { headerBlank } from '../../styles/navigationAppearance'
import i18n from '../../utils/i18n'
import CenterOfInterestScreen from '../personalInformation/centerinterest/CenterOfInterestScreen'
import PersonalInformationScreen from '../personalInformation/PersonalInformationScreen'
import ProfileDataProtectionScreen from './ProfileDataProtectionScreen'
import ProfilLoginScreen from './ProfileLoginScreen'
import ProfileScreen from './ProfileScreen'
import ProfileTermsOfUseScreen from './ProfileTermsOfUseScreen'
import ProfileZipCodeScreen from './ProfileZipCodeScreen'

const ProfileStack = createStackNavigator<ProfileParamList>()

const ProfileNavigator: FunctionComponent = () => {
  return (
    <ProfileStack.Navigator screenOptions={headerBlank}>
      <ProfileStack.Screen
        name={Screen.profile}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name={Screen.profileLogin}
        component={ProfilLoginScreen}
      />
      <ProfileStack.Screen
        name={Screen.profileTermsOfUse}
        component={ProfileTermsOfUseScreen}
      />
      <ProfileStack.Screen
        name={Screen.profileDataProtection}
        component={ProfileDataProtectionScreen}
      />
      <ProfileStack.Screen
        name={Screen.profileZipCode}
        component={ProfileZipCodeScreen}
        options={{ title: i18n.t('profileZipCode.title') }}
      />
      <ProfileStack.Screen
        name={Screen.personalInformation}
        component={PersonalInformationScreen}
      />
      <ProfileStack.Screen
        name={Screen.centerOfInterest}
        component={CenterOfInterestScreen}
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileNavigator
