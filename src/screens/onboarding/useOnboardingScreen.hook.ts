import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { HomeRepository } from '../../data/HomeRepository'
import { UnauthenticatedRootNavigatorScreenProps } from '../../navigation/UnauthenticatedRootNavigator'
import { OnboardingViewModel } from './OnboardingViewModel'
import { OnboardingViewModelMapper } from './OnboardingViewModelMapper'

export const useOnboardingScreen = (): {
  viewModel: OnboardingViewModel
  onLogin: () => void
  onSignUp: () => void
  onLegacyLogin: () => void
} => {
  const navigation = useNavigation<
    UnauthenticatedRootNavigatorScreenProps<'Onboarding'>['navigation']
  >()

  useEffect(() => {
    HomeRepository.getInstance()
      .getOnboardingHeader()
      .then((headerInfos) => console.log('-->', headerInfos))
      .catch((error) => console.log('ERROR', error))
  })

  const onLogin = () => {
    navigation.navigate('Login')
  }

  const onSignUp = () => {
    navigation.navigate('SignUp')
  }

  const onLegacyLogin = () => {
    navigation.navigate('Login')
  }

  const viewModel = OnboardingViewModelMapper.map(undefined)

  return {
    viewModel,
    onLogin,
    onSignUp,
    onLegacyLogin,
  }
}
