import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { AllRoutes, router, useLocalSearchParams } from 'expo-router'
import { HeaderInfos } from '../../core/entities/HeaderInfos'
import { DataSource } from '../../data/DataSource'
import { OnboardingRepository } from '../../data/OnboardingRepository'
import { OnboardingViewModel } from './OnboardingViewModel'
import { OnboardingViewModelMapper } from './OnboardingViewModelMapper'

export const useOnboardingScreen = (): {
  viewModel: OnboardingViewModel
  onLogin: () => void
  onSignUp: () => void
  onLegacyLogin: () => void
} => {
  const [headerInfos, setHeaderInfos] = useState<HeaderInfos>()
  const { redirect } = useLocalSearchParams<{ redirect?: AllRoutes }>()

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
    router.push({
      pathname: '/sign-in',
      params: { redirect },
    })
  }

  const onSignUp = () => {
    router.navigate('/sign-up')
  }

  const onLegacyLogin = () => {
    router.push('/sign-in')
  }

  const viewModel = OnboardingViewModelMapper.map(headerInfos)

  return {
    viewModel,
    onLogin,
    onSignUp,
    onLegacyLogin,
  }
}
