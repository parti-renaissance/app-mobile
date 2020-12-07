import { useState, useCallback } from 'react'
import ProfileRepository from '../../data/ProfileRepository'
import RegionsRepository from '../../data/RegionsRepository'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { ViewState } from '../shared/StatefulView'
import { ProfileScreenViewModel } from './ProfileScreenViewModel'
import { ProfileScreenViewModelMapper } from './ProfileScreenViewModelMapper'

export function useProfile() {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<ProfileScreenViewModel>
  >(new ViewState.Loading())
  const [isRefreshing, setRefreshing] = useState(true)

  const refresh = useCallback(() => {
    setRefreshing(true)
    ProfileRepository.getInstance()
      .getProfile()
      .then((profile) => {
        return RegionsRepository.getInstance()
          .getDepartment(profile.zipCode)
          .then((department) => {
            return {
              department: department,
              profile: profile,
            }
          })
      })
      .then(({ profile, department }) => {
        const viewModel = ProfileScreenViewModelMapper.map(profile, department)
        setStatefulState(new ViewState.Content(viewModel))
      })
      .catch((error) => {
        console.error(error)
        setStatefulState(
          new ViewState.Error(GenericErrorMapper.mapErrorMessage(error), () => {
            setStatefulState(new ViewState.Loading())
            refresh()
          }),
        )
      })
      .finally(() => {
        setRefreshing(false)
      })
  }, [setStatefulState, setRefreshing])

  return {
    isRefreshing,
    refresh,
    statefulState,
  }
}
