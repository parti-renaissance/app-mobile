import {
  GetUserProfileInteractor,
  ProfileAuthenticatedResult,
} from '../../core/interactor/GetUserProfileInteractor'
import { useStatefulQuery } from '../newsDetail/useStatefulQuery.hook'
import { ViewState } from '../shared/ViewState'

const timeoutPromise = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 3000)
  })
}

const withTimeout = <T>(promise: Promise<T>): Promise<T> => {
  return timeoutPromise().then(() => promise)
}

export const useProfileQuery = (): {
  statefulState: ViewState<ProfileAuthenticatedResult>
} => {
  const { statefulState: statefulStateCache } = useStatefulQuery(
    ['userCache'],
    () =>
      new GetUserProfileInteractor().execute('cache').then((result) => {
        return {
          profile: {
            ...result.profile,
            firstName: result.profile.firstName + 'cache',
          },
          department: result.department,
        }
      }),
  )
  const { statefulState } = useStatefulQuery(
    ['user'],
    () => withTimeout(new GetUserProfileInteractor().execute('remote')),
    { enabled: statefulStateCache.state === 'content' },
  )
  return {
    statefulState:
      statefulState.state === 'content' ? statefulState : statefulStateCache,
  }
}
