import React, { FC } from 'react'

import { Screen, ProfileLoginScreenProps } from '../../navigation'
import LoginScreen from '../authentication/LoginScreen'

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
