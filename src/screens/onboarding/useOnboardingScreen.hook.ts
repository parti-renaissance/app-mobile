import { useCallback, useState } from 'react'
import { HeaderInfos } from '../../core/entities/HeaderInfos'
import { DataSource } from '../../data/DataSource'
import { OnboardingRepository } from '../../data/OnboardingRepository'
import { OnboardingViewModel } from './OnboardingViewModel'
import { OnboardingViewModelMapper } from './OnboardingViewModelMapper'
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

export const useOnboardingScreen = (): {
  viewModel: OnboardingViewModel
  onLogin: () => void
  onSignUp: () => void
  onLegacyLogin: () => void
} => {
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
    router.push('/onboarding/sign-in')
  }

  const onSignUp = () => {
    router.navigate('/onboarding/sign-up')
  }

  const onLegacyLogin = () => {
    router.push('/onboarding/sign-in')
  }

  const viewModel = OnboardingViewModelMapper.map(headerInfos)

  return {
    viewModel,
    onLogin,
    onSignUp,
    onLegacyLogin,
  }
}
