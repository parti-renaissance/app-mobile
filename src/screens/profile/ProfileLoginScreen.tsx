import React, { FC } from 'react'

import { Screen } from '../../navigation'
import { ProfileModalNavigatorScreenProps } from '../../navigation/ProfileModalNavigator'
import LoginScreen from '../authentication/LoginScreen'

type ProfileLoginScreenProps = ProfileModalNavigatorScreenProps<'ProfileLogin'>

const ProfilLoginScreen: FC<ProfileLoginScreenProps> = ({ navigation }) => {
  return (
    <LoginScreen
      onSuccess={() => {
        navigation.navigate(Screen.profile)
      }}
      navigation={navigation}
    />
  )
}

export default ProfilLoginScreen
