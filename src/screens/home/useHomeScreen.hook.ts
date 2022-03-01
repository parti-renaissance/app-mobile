import { useCallback, useEffect, useState } from 'react'
import { ServerTimeoutError } from '../../core/errors'
import {
  GetHomeResourcesInteractor,
  HomeResources,
} from '../../core/interactor/GetHomeResourcesInteractor'
import { ViewState } from '../shared/StatefulView'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { HomeViewModel } from './HomeViewModel'
import { HomeViewModelMapper } from './HomeViewModelMapper'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Analytics } from '../../utils/Analytics'
import { SaveQuickPollAsAnsweredInteractor } from '../../core/interactor/SaveQuickPollAsAnsweredInteractor'
import { EventRowViewModel } from '../events/EventViewModel'
import { HomeNavigatorScreenProps } from '../../navigation/HomeNavigator'
import { GetTimelineFeedInteractor } from '../../core/interactor/GetTimelineFeedInteractor'
import { TimelineFeedItem } from '../../core/entities/TimelineFeedItem'

export const useHomeScreen = (): {
  statefulState: ViewState<HomeViewModel>
  isRefreshing: boolean
  onRefresh: () => void
  onRegionMorePressed: () => void
  onQuickPollAnswerSelected: (pollId: string, answerId: string) => void
  onEventSelected: (event: EventRowViewModel) => void
  onRetaliationSelected: (id: string) => void
  onRetaliateSelected: (id: string) => void
  onFeedNewsSelected: (newsId: string) => void
  onFeedPhoningCampaignSelected: (campaignId: string) => void
  onFeedDoorToDoorCampaignSelected: (campaignId: string) => void
  onFeedPollSelected: (pollId: string) => void
} => {
  const navigation = useNavigation<
    HomeNavigatorScreenProps<'Home'>['navigation']
  >()
  const [statefulState, setStatefulState] = useState<ViewState<HomeResources>>(
    ViewState.Loading(),
  )
  const [headerStatefulState, setHeaderStatefulState] = useState<
    ViewState<HeaderInfos>
  >(ViewState.Loading())
  const [feedStatefulState, setFeedStatefulState] = useState<
    ViewState<Array<TimelineFeedItem>>
  >(ViewState.Loading())
  const [isRefreshing, setRefreshing] = useState(true)
  const [initialFetchDone, setInitialFetchDone] = useState(false)

  const fetchData = useCallback((cacheJustLoaded: boolean = false) => {
    setRefreshing(true)
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
            setStatefulState(ViewState.Loading())
            fetchData()
          }),
        )
      })
      .finally(() => {
        setRefreshing(false)
      })
  }, [])

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

  useFocusEffect(firstDataFetch)

  useEffect(() => {
    const fetchTimelineFeed = () => {
      new GetTimelineFeedInteractor()
        .execute(0)
        .then((response) => {
          setFeedStatefulState(ViewState.Content(response.result))
        })
        .catch((error) => {
          setFeedStatefulState(
            ViewStateUtils.networkError(error, fetchTimelineFeed),
          )
        })
    }
    fetchTimelineFeed()
  }, [])

  const onRefresh = () => {
    fetchData()
  }

  const onFeedNewsSelected = (newsId: string) => {
    // TODO: (Pierre Felgines) 2022/02/28 Update analytics
    Analytics.logHomeNewsOpen()
    navigation.navigate('NewsDetailModal', {
      screen: 'NewsDetail',
      params: { newsId },
    })
  }

  const onRegionMorePressed = async () => {
    const zipCode = ViewState.unwrap(statefulState)?.zipCode
    if (zipCode === undefined) {
      return
    }
    await Analytics.logHomeRegionMore()
    navigation.navigate('Region', { zipCode })
  }

  const onQuickPollAnswerSelected = async (
    pollId: string,
    answerId: string,
  ) => {
    const currentResources = ViewState.unwrap(statefulState)
    if (!currentResources) {
      return
    }
    const interactor = new SaveQuickPollAsAnsweredInteractor()
    const updatedPoll = await interactor.execute({
      quickPollId: pollId,
      answerId: answerId,
    })
    // We must make a clone to update state
    const clone: HomeResources = {
      ...currentResources,
      quickPoll: updatedPoll,
    }
    setStatefulState(ViewState.Content(clone))
  }

  const onEventSelected = async (event: EventRowViewModel) => {
    await Analytics.logHomeEventOpen(event.title, event.category)
    navigation.navigate('EventDetails', { eventId: event.id })
  }

  const findItemWithId = (id: string): TimelineFeedItem | undefined => {
    const items = ViewState.unwrap(feedStatefulState) ?? []
    return items.find((item) => item.uuid === id)
  }

  const onRetaliationSelected = (id: string) => {
    navigation.navigate('RetaliationDetail', {
      retaliationId: id,
    })
  }

  const onRetaliateSelected = (id: string) => {
    // TODO: (Pierre Felgines) 2022/02/28 Find retaliation from feed
    console.log(id)
    // const retaliation = currentResources?.retaliations.find(
    //   (item) => item.id === id,
    // )
    // if (retaliation !== null && retaliation !== undefined) {
    //   RetaliationService.retaliate(retaliation)
    // }
  }

  const onFeedPhoningCampaignSelected = (campaignId: string) => {
    const item = findItemWithId(campaignId)
    if (item === undefined) {
      return
    }
    navigation.navigate('PhoningSessionModal', {
      screen: 'PhoningSessionLoader',
      params: {
        campaignId: item.uuid,
        campaignTitle: item.title,
        device: 'current',
      },
    })
  }

  const onFeedDoorToDoorCampaignSelected = () => {
    navigation.navigate('DoorToDoor')
  }

  const onFeedPollSelected = (pollId: string) => {
    // TODO: (Pierre Felgines) 2022/02/28 Fix type of id attribute mismatch
    console.log(pollId)
    // const item = findItemWithId(campaignId)
    // if (item === undefined) {
    //   return
    // }
    // navigation.navigate('PollDetailModal', {
    //   screen: 'PollDetail',
    //   params: { pollId: item.uuid },
    // })
  }

  return {
    statefulState: ViewState.map(statefulState, (currentResources) => {
      return HomeViewModelMapper.map(
        currentResources.profile,
        currentResources.region,
        currentResources.quickPoll,
        currentResources.nextEvent,
        ViewState.unwrap(feedStatefulState) ?? [],
      )
    }),
    isRefreshing,
    onRefresh,
    onRegionMorePressed,
    onQuickPollAnswerSelected,
    onEventSelected,
    onRetaliationSelected,
    onRetaliateSelected,
    onFeedNewsSelected,
    onFeedPhoningCampaignSelected,
    onFeedDoorToDoorCampaignSelected,
    onFeedPollSelected,
  }
}
