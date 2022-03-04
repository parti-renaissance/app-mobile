import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { headerBlank } from '../../styles/navigationAppearance'
import i18n from '../../utils/i18n'
import CenterOfInterestScreen from '../../screens/personalInformation/centerinterest/CenterOfInterestScreen'
import NotificationMenuScreen from '../../screens/personalInformation/notifications/NotificationMenuScreen'
import NotificationsScreen from '../../screens/personalInformation/notifications/NotificationsScreen'
import PersonalInformationScreen from '../../screens/personalInformation/PersonalInformationScreen'
import ProfileScreen from '../../screens/profile/ProfileScreen'
import { ProfileModalNavigatorParamList } from './ProfileModalNavigatorParamList'

const Stack = createStackNavigator<ProfileModalNavigatorParamList>()

const ProfileModalNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen name={'Profile'} component={ProfileScreen} />
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
