import React, { FC } from 'react'

import { Screen, ProfileLoginScreenProps } from '../../navigation'
import LoginScreen from '../authentication/LoginScreen'

type Props = Readonly<ProfileLoginScreenProps>

const ProfilLoginScreen: FC<Props> = ({ navigation }) => {
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
