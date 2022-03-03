import { useNavigation } from '@react-navigation/native'
import { UnauthenticatedRootNavigatorScreenProps } from '../../navigation/UnauthenticatedRootNavigator'

export const useUnauthenticatedHomeScreen = (): {
  onLogin: () => void
  onSignUp: () => void
  onLegacyLogin: () => void
} => {
  const navigation = useNavigation<
    UnauthenticatedRootNavigatorScreenProps<'UnauthenticatedHome'>['navigation']
  >()

  const onLogin = () => {
    navigation.navigate('Login')
  }

  const onSignUp = () => {
    navigation.navigate('SignUp')
  }

  const onLegacyLogin = () => {
    navigation.navigate('Login')
  }

  return {
    onLogin,
    onSignUp,
    onLegacyLogin,
  }
}
