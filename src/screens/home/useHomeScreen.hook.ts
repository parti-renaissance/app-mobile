import { useCallback, useEffect, useState } from 'react'
import { ViewState } from '../shared/ViewState'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { HomeViewModel } from './HomeViewModel'
import { HomeViewModelMapper } from './HomeViewModelMapper'
import { useNavigation } from '@react-navigation/native'
import { Analytics } from '../../utils/Analytics'
import { SaveQuickPollAsAnsweredInteractor } from '../../core/interactor/SaveQuickPollAsAnsweredInteractor'
import { HomeNavigatorScreenProps } from '../../navigation/home/HomeNavigatorScreenProps'
import { GetTimelineFeedInteractor } from '../../core/interactor/GetTimelineFeedInteractor'
import {
  TimelineFeedItem,
  TimelineFeedItemActionCampaign,
  TimelineFeedItemEvent,
  TimelineFeedItemRetaliation,
} from '../../core/entities/TimelineFeedItem'
import { useFetchHomeResources } from './useFetchHomeResources.hook'
import { PaginatedResult } from '../../core/entities/PaginatedResult'
import { useOnFocus } from '../../utils/useOnFocus.hook'
import { RetaliationService } from '../../data/RetaliationService'

export const useHomeScreen = (): {
  statefulState: ViewState<HomeViewModel>
  isRefreshing: boolean
  isLoadingMore: boolean
  onRefresh: () => void
  onRegionMorePressed: () => void
  onQuickPollAnswerSelected: (pollId: string, answerId: string) => void
  onNextEventSelected: (eventId: string) => void
  onRetaliationSelected: (id: string) => void
  onRetaliateSelected: (id: string) => void
  onFeedNewsSelected: (newsId: string) => void
  onFeedEventSelected: (eventId: string) => void
  onFeedPhoningCampaignSelected: (campaignId: string) => void
  onFeedDoorToDoorCampaignSelected: (campaignId: string) => void
  onFeedPollSelected: (pollId: string) => void
  onLoadMore: () => void
} => {
  const navigation = useNavigation<
    HomeNavigatorScreenProps<'Home'>['navigation']
  >()
  const [feedStatefulState, setFeedStatefulState] = useState<
    ViewState<PaginatedResult<Array<TimelineFeedItem>>>
  >(ViewState.Loading())
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const {
    statefulState,
    isRefreshing,
    fetchHomeResources,
    updateQuickPoll,
  } = useFetchHomeResources()

  useOnFocus(fetchHomeResources)

  const fetchTimelineFeed = useCallback(() => {
    setIsLoadingMore(true)
    setFeedStatefulState(ViewState.Loading())
    new GetTimelineFeedInteractor()
      .execute(0)
      .then((response) => {
        setFeedStatefulState(ViewState.Content(response))
      })
      .catch((error) => {
        setFeedStatefulState(
          ViewStateUtils.networkError(error, fetchTimelineFeed),
        )
      })
      .finally(() => setIsLoadingMore(false))
  }, [])

  useEffect(() => {
    fetchTimelineFeed()
  }, [fetchTimelineFeed])

  const onLoadMore = useCallback(() => {
    const currentResult = ViewState.unwrap(feedStatefulState)
    if (currentResult === undefined || isLoadingMore) {
      return
    }

    const paginationInfo = currentResult.paginationInfo
    if (paginationInfo.currentPage === paginationInfo.lastPage) {
      // last page reached : nothing to paginate
      return
    }

    setIsLoadingMore(true)
    new GetTimelineFeedInteractor()
      .execute(paginationInfo.currentPage + 1)
      .then((response) => {
        const newContent = PaginatedResult.merge(currentResult, response)
        setFeedStatefulState(ViewState.Content(newContent))
      })
      .catch(() => {
        // no-op: next page can be reloaded by reaching the end of the list again
      })
      .finally(() => setIsLoadingMore(false))
  }, [feedStatefulState, isLoadingMore])

  const onRefresh = () => {
    fetchTimelineFeed()
    fetchHomeResources()
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
    const interactor = new SaveQuickPollAsAnsweredInteractor()
    const updatedPoll = await interactor.execute({
      quickPollId: pollId,
      answerId: answerId,
    })
    updateQuickPoll(updatedPoll)
  }

  const onNextEventSelected = (eventId: string) => {
    const currentResources = ViewState.unwrap(statefulState)
    const event = currentResources?.nextEvent
    if (!event || event.uuid !== eventId) {
      return
    }
    Analytics.logHomeEventOpen(event.name, event.category)
    navigation.navigate('EventDetails', { eventId: event.uuid })
  }

  const onFeedEventSelected = (eventId: string) => {
    const item = findItemWithId<TimelineFeedItemEvent>(eventId, 'event')
    if (item === undefined) {
      return
    }
    Analytics.logHomeEventOpen(item.title, item.category ?? '')
    navigation.navigate('EventDetails', { eventId: item.uuid })
  }

  const findItemWithId = <T extends TimelineFeedItem['value']>(
    id: string,
    type: TimelineFeedItem['type'],
  ): T | undefined => {
    const items = ViewState.unwrap(feedStatefulState)?.result ?? []
    return items.find((item) => item.type === type && item.value.uuid === id)
      ?.value as T
  }

  const onRetaliationSelected = (id: string) => {
    navigation.navigate('RetaliationDetail', {
      retaliationId: id,
    })
  }

  const onRetaliateSelected = (id: string) => {
    const item = findItemWithId<TimelineFeedItemRetaliation>(id, 'retaliation')
    if (item === undefined) {
      return
    }
    RetaliationService.retaliate({
      content: item.description,
      url: item.url,
    })
  }

  const onFeedPhoningCampaignSelected = (campaignId: string) => {
    const item = findItemWithId<TimelineFeedItemActionCampaign>(
      campaignId,
      'phoning',
    )
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
    navigation.navigate('PollDetailModal', {
      screen: 'PollDetail',
      params: { pollId },
    })
  }

  return {
    statefulState: ViewState.map(statefulState, (currentResources) => {
      return HomeViewModelMapper.map(
        currentResources.headerInfos,
        currentResources.profile,
        currentResources.region,
        currentResources.quickPoll,
        currentResources.nextEvent,
        ViewState.map(feedStatefulState, (state) => state.result),
      )
    }),
    isRefreshing,
    isLoadingMore,
    onRefresh,
    onRegionMorePressed,
    onQuickPollAnswerSelected,
    onNextEventSelected,
    onRetaliationSelected,
    onRetaliateSelected,
    onFeedNewsSelected,
    onFeedEventSelected,
    onFeedPhoningCampaignSelected,
    onFeedDoorToDoorCampaignSelected,
    onFeedPollSelected,
    onLoadMore,
  }
}
