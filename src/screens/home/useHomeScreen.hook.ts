import { useCallback, useEffect, useState } from 'react'
import { ServerTimeoutError } from '../../core/errors'
import {
  GetHomeResourcesInteractor,
  HomeResources,
} from '../../core/interactor/GetHomeResourcesInteractor'
import { HomeScreenProps, Screen } from '../../navigation'
import { ViewState } from '../shared/StatefulView'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { HomeViewModel } from './HomeViewModel'
import { HomeViewModelMapper } from './HomeViewModelMapper'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Analytics } from '../../utils/Analytics'
import { SaveQuickPollAsAnsweredInteractor } from '../../core/interactor/SaveQuickPollAsAnsweredInteractor'
import { EventRowViewModel } from '../events/EventViewModel'
import { RetaliationService } from '../../data/RetaliationService'
import { ExternalLink } from '../shared/ExternalLink'

export const useHomeScreen = (): {
  statefulState: ViewState<HomeViewModel>
  isRefreshing: boolean
  onRefresh: () => void
  onPollSelected: (pollId: number) => void
  onNewsSelected: (newsUrl: string) => void
  onToolSelected: (toolUrl: string, toolName: string) => void
  onNewsMorePressed: () => void
  onPollsMorePressed: () => void
  onToolsMorePressed: () => void
  onRegionMorePressed: () => void
  onQuickPollAnswerSelected: (pollId: string, answerId: string) => void
  onEventSelected: (event: EventRowViewModel) => void
  onRetaliationSelected: (id: string) => void
  onRetaliateSelected: (id: string) => void
  onFeedNewsSelected: (newsId: string) => void
  onFeedPhoningCampaignsSelected: () => void
  onFeedDoorToDoorCampaignsSelected: () => void
  onFeedPollsSelected: () => void
  onFeedPhoningCampaignSelected: (campaignId: string) => void
  onFeedDoorToDoorCampaignSelected: (campaignId: string) => void
  onFeedPollSelected: (pollId: string) => void
} => {
  const navigation = useNavigation<HomeScreenProps['navigation']>()
  const [statefulState, setStatefulState] = useState<ViewState<HomeViewModel>>(
    ViewState.Loading(),
  )
  const [isRefreshing, setRefreshing] = useState(true)
  const [initialFetchDone, setInitialFetchDone] = useState(false)
  const [currentResources, setResources] = useState<HomeResources>()

  useEffect(() => {
    // Reload view model (and view) when resources model changes
    if (!currentResources) {
      return
    }
    const viewModel = HomeViewModelMapper.map(
      currentResources.profile,
      currentResources.region,
      currentResources.news,
      currentResources.polls,
      currentResources.tools,
      currentResources.quickPoll,
      currentResources.nextEvent,
      currentResources.retaliations,
    )
    setStatefulState(ViewState.Content(viewModel))
  }, [currentResources])

  const fetchData = useCallback((cacheJustLoaded: boolean = false) => {
    setRefreshing(true)
    new GetHomeResourcesInteractor()
      .execute('remote')
      .then((resources) => {
        setResources(resources)
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
        setResources(resources)
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

  const onRefresh = () => {
    fetchData()
  }

  const onPollSelected = (pollId: number) => {
    navigation.navigate(Screen.pollDetailModal, {
      screen: Screen.pollDetail,
      params: { pollId: pollId },
    })
  }
  const onNewsSelected = async (newsUrl: string) => {
    await Analytics.logHomeNewsOpen()
    ExternalLink.openUrl(newsUrl)
  }
  const onToolSelected = async (toolUrl: string, toolName: string) => {
    await Analytics.logHomeToolOpen(toolName)
    ExternalLink.openUrl(toolUrl)
  }
  const onNewsMorePressed = async () => {
    await Analytics.logHomeNewsMore()
    navigation.navigate(Screen.news)
  }
  const onFeedNewsSelected = (newsId: string) => {
    navigation.navigate(Screen.newsDetailModal, {
      screen: Screen.newsDetail,
      params: { newsId },
    })
  }
  const onPollsMorePressed = () => {
    navigation.navigate(Screen.pollsNavigator)
  }
  const onToolsMorePressed = async () => {
    await Analytics.logHomeToolsMore()
    navigation.navigate(Screen.tools)
  }
  const onRegionMorePressed = async () => {
    if (!currentResources) {
      return
    }
    await Analytics.logHomeRegionMore()
    navigation.navigate(Screen.region, { zipCode: currentResources.zipCode })
  }
  const onQuickPollAnswerSelected = async (
    pollId: string,
    answerId: string,
  ) => {
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
    setResources(clone)
  }
  const onEventSelected = async (event: EventRowViewModel) => {
    await Analytics.logHomeEventOpen(event.title, event.category)
    navigation.navigate(Screen.eventDetails, { eventId: event.id })
  }
  const onRetaliationSelected = (id: string) => {
    const retaliation = currentResources?.retaliations.find(
      (item) => item.id === id,
    )
    if (retaliation !== null && retaliation !== undefined) {
      navigation.navigate(Screen.retaliationDetailScreen, {
        retaliation: retaliation,
      })
    }
  }
  const onRetaliateSelected = (id: string) => {
    const retaliation = currentResources?.retaliations.find(
      (item) => item.id === id,
    )
    if (retaliation !== null && retaliation !== undefined) {
      RetaliationService.retaliate(retaliation)
    }
  }
  const onFeedPhoningCampaignsSelected = () => {
    navigation.navigate(Screen.phoningNavigator, { screen: Screen.phoning })
  }
  const onFeedDoorToDoorCampaignsSelected = () => {
    // TODO: (Pierre Felgines) 2022/02/11 Fix navigation
  }
  const onFeedPollsSelected = () => {
    navigation.navigate(Screen.pollsNavigator)
  }
  const onFeedPhoningCampaignSelected = (campaignId: string) => {
    // TODO: (Pierre Felgines) 2022/02/11 Fix navigation
    console.log('onFeedPhoningCampaignSelected', campaignId)
  }
  const onFeedDoorToDoorCampaignSelected = (campaignId: string) => {
    // TODO: (Pierre Felgines) 2022/02/11 Fix navigation
    console.log('onFeedDoorToDoorCampaignSelected', campaignId)
  }
  const onFeedPollSelected = (pollId: string) => {
    // TODO: (Pierre Felgines) 2022/02/11 Fix navigation
    console.log('onFeedPollSelected', pollId)
  }

  return {
    statefulState,
    isRefreshing,
    onRefresh,
    onPollSelected,
    onNewsSelected,
    onToolSelected,
    onNewsMorePressed,
    onPollsMorePressed,
    onToolsMorePressed,
    onRegionMorePressed,
    onQuickPollAnswerSelected,
    onEventSelected,
    onRetaliationSelected,
    onRetaliateSelected,
    onFeedNewsSelected,
    onFeedPhoningCampaignsSelected,
    onFeedDoorToDoorCampaignsSelected,
    onFeedPollsSelected,
    onFeedPhoningCampaignSelected,
    onFeedDoorToDoorCampaignSelected,
    onFeedPollSelected,
  }
}
