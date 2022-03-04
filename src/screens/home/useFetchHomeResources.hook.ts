import { useCallback, useState } from 'react'
import { StatefulQuickPoll } from '../../core/entities/StatefulQuickPoll'
import { ServerTimeoutError } from '../../core/errors'
import {
  GetHomeResourcesInteractor,
  HomeResources,
} from '../../core/interactor/GetHomeResourcesInteractor'
import { ViewState } from '../shared/ViewState'
import { ViewStateUtils } from '../shared/ViewStateUtils'

export const useFetchHomeResources = (): {
  statefulState: ViewState<HomeResources>
  isRefreshing: boolean
  fetchHomeResources: () => void
  updateQuickPoll: (quickPoll: StatefulQuickPoll) => void
} => {
  const [isRefreshing, setRefreshing] = useState(true)
  const [initialFetchDone, setInitialFetchDone] = useState(false)
  const [statefulState, setStatefulState] = useState<ViewState<HomeResources>>(
    ViewState.Loading(),
  )

  const isDataLoaded = useCallback(() => statefulState.state === 'content', [
    statefulState,
  ])

  const fetchData = useCallback(
    (cacheJustLoaded: boolean = false) => {
      if (isDataLoaded()) {
        setRefreshing(true)
      } else {
        setStatefulState(ViewState.Loading())
      }
      new GetHomeResourcesInteractor()
        .execute('remote')
        .then((resources) => {
          setStatefulState(ViewState.Content(resources))
        })
        .catch((error) => {
          const isNetworkError = error instanceof ServerTimeoutError
          if (isNetworkError && cacheJustLoaded) {
            return
          }
          setStatefulState(
            ViewStateUtils.networkError(error, () => {
              fetchData()
            }),
          )
        })
        .finally(() => {
          setRefreshing(false)
        })
    },
    [isDataLoaded],
  )

  const firstDataFetch = useCallback(() => {
    new GetHomeResourcesInteractor()
      .execute('cache')
      .then((resources) => {
        setStatefulState(ViewState.Content(resources))
        if (!initialFetchDone) {
          setInitialFetchDone(true)
          fetchData(true)
        }
      })
      .catch(() => {
        fetchData()
      })
  }, [fetchData, initialFetchDone])

  const fetchHomeResources = useCallback(() => {
    if (isDataLoaded()) {
      fetchData(false)
    } else {
      firstDataFetch()
    }
  }, [isDataLoaded, fetchData, firstDataFetch])

  const updateQuickPoll = useCallback(
    (quickPoll: StatefulQuickPoll) => {
      // We must make a clone to update state
      const currentResources = ViewState.unwrap(statefulState)
      if (currentResources === undefined) {
        return
      }
      const clone: HomeResources = {
        ...currentResources,
        quickPoll,
      }
      setStatefulState(ViewState.Content(clone))
    },
    [statefulState],
  )

  return { statefulState, isRefreshing, fetchHomeResources, updateQuickPoll }
}
