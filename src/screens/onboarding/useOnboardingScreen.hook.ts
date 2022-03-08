import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { HeaderInfos } from '../../core/entities/HeaderInfos'
import { DataSource } from '../../data/DataSource'
import { OnboardingRepository } from '../../data/OnboardingRepository'
import { OnboardingNavigatorScreenProps } from '../../navigation/onboarding/OnboardingNavigatorScreenProps'
import { OnboardingViewModel } from './OnboardingViewModel'
import { OnboardingViewModelMapper } from './OnboardingViewModelMapper'

export const useOnboardingScreen = (): {
  viewModel: OnboardingViewModel
  onLogin: () => void
  onSignUp: () => void
  onLegacyLogin: () => void
} => {
  const navigation = useNavigation<
    OnboardingNavigatorScreenProps<'Onboarding'>['navigation']
  >()
  const [headerInfos, setHeaderInfos] = useState<HeaderInfos>()

  const fetchHeader = useCallback((dataSource: DataSource): Promise<void> => {
    return OnboardingRepository.getInstance()
      .getOnboardingHeader(dataSource)
      .then((result) => {
        setHeaderInfos(result)
      })
      .catch((error) => {
        console.log('Error fetching onboarding header', error)
        setHeaderInfos(undefined)
      })
  }, [])

  const load = useCallback(() => {
    fetchHeader('cache').then(() => {
      return fetchHeader('remote')
    })
  }, [fetchHeader])

  useFocusEffect(load)

  const onLogin = () => {
    navigation.navigate('Login')
  }

  const onSignUp = () => {
    navigation.navigate('SignUp')
  }

  const onLegacyLogin = () => {
    navigation.navigate('Login')
  }

  const viewModel = OnboardingViewModelMapper.map(headerInfos)

  return {
    viewModel,
    onLogin,
    onSignUp,
    onLegacyLogin,
  }
}
