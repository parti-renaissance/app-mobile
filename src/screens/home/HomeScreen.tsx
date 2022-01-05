import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  StyleSheet,
  SectionList,
  SectionListRenderItemInfo,
  RefreshControl,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'

import { HomeScreenProps, Screen } from '../../navigation'
import { Colors } from '../../styles'
import { StatefulView, ViewState } from '../shared/StatefulView'
import HomeHeader from './HomeHeader'
import HomePollRowContainer from './HomePollRowContainer'
import HomeRegion from './HomeRegion'
import { HomeRowViewModel } from './HomeRowViewModel'
import HomeSectionRow from './HomeSectionRow'
import HomeToolRowContainer from './tools/HomeToolRowContainer'
import { HomeViewModel } from './HomeViewModel'
import { HomeViewModelMapper } from './HomeViewModelMapper'
import HomeNewsRowContainer from './news/HomeNewsRowContainer'
import {
  GetHomeResourcesInteractor,
  HomeResources,
} from '../../core/interactor/GetHomeResourcesInteractor'
import { useFocusEffect } from '@react-navigation/native'
import { ExternalLink } from '../shared/ExternalLink'
import { ServerTimeoutError } from '../../core/errors'
import HomeQuickPollRowContainer from './quickPoll/HomeQuickPollRowContainer'
import { SaveQuickPollAsAnsweredInteractor } from '../../core/interactor/SaveQuickPollAsAnsweredInteractor'
import { HomeEventRowContainer } from './events/HomeEventRowContainer'
import { ProfileButton } from '../shared/NavigationHeaderButton'
import { HomeRetaliationRowContainer } from './retaliation/HomeRetaliationRowContainer'
import { RetaliationService } from '../../data/RetaliationService'
import { ViewStateUtils } from '../shared/ViewStateUtils'

const HomeScreen: FunctionComponent<HomeScreenProps> = ({ navigation }) => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<HomeResources>
  >(new ViewState.Loading())
  const [isRefreshing, setRefreshing] = useState(true)
  const [initialFetchDone, setInitialFetchDone] = useState(false)
  const [currentResources, setResources] = useState<HomeResources>()

  useEffect(() => {
    const navigationToProfile = () => {
      navigation.navigate(Screen.profileModal)
    }
    navigation.setOptions({
      headerRight: () => <ProfileButton onPress={navigationToProfile} />,
    })
  }, [navigation])

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
    setStatefulState(new ViewState.Content(viewModel))
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
            setStatefulState(new ViewState.Loading())
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

  const onPollSelected = (pollId: number) => {
    navigation.navigate(Screen.pollDetailModal, {
      screen: Screen.pollDetail,
      params: { pollId: pollId },
    })
  }
  const onNewsSelected = (newsUrl: string) => {
    ExternalLink.openUrl(newsUrl)
  }
  const onToolSelected = (toolUrl: string) => {
    ExternalLink.openUrl(toolUrl)
  }
  const onNewsMorePressed = () => {
    navigation.navigate(Screen.homeNavigator, {
      screen: Screen.news,
    })
    navigation.navigate(Screen.news)
  }
  const onPollsMorePressed = () => {
    navigation.navigate(Screen.polls)
  }
  const onToolsMorePressed = () => {
    navigation.navigate(Screen.tools)
  }
  const onRegionMorePressed = () => {
    if (!currentResources) {
      return
    }
    navigation.navigate(Screen.homeNavigator, {
      screen: Screen.region,
      params: { zipCode: currentResources.zipCode },
    })
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
  const onEventSelected = (eventId: string) => {
    navigation.navigate(Screen.homeNavigator, {
      screen: Screen.eventDetails,
      params: { eventId: eventId },
    })
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

  const renderItem = ({
    item,
  }: SectionListRenderItemInfo<HomeRowViewModel>) => {
    if (item.type === 'news') {
      return (
        <HomeNewsRowContainer
          viewModel={item.value}
          onNewsSelected={onNewsSelected}
          onMorePressed={onNewsMorePressed}
        />
      )
    } else if (item.type === 'polls') {
      return (
        <HomePollRowContainer
          viewModel={item.value}
          onPollSelected={onPollSelected}
          onMorePressed={onPollsMorePressed}
        />
      )
    } else if (item.type === 'tools') {
      return (
        <HomeToolRowContainer
          viewModel={item.value}
          onMorePressed={onToolsMorePressed}
          onToolSelected={onToolSelected}
        />
      )
    } else if (item.type === 'region') {
      return (
        <HomeRegion
          viewModel={item.value}
          onMorePressed={onRegionMorePressed}
        />
      )
    } else if (item.type === 'quick_poll') {
      return (
        <HomeQuickPollRowContainer
          viewModel={item.value}
          onAnswerSelected={onQuickPollAnswerSelected}
        />
      )
    } else if (item.type === 'event') {
      return (
        <HomeEventRowContainer
          viewModel={item.value}
          onEventSelected={onEventSelected}
        />
      )
    } else if (item.type === 'retaliation') {
      return (
        <HomeRetaliationRowContainer
          viewModel={item.value}
          onRetaliationSelected={onRetaliationSelected}
          onRetaliateSelected={onRetaliateSelected}
        />
      )
    } else {
      return null
    }
  }

  const HomeContent = (homeViewModel: HomeViewModel) => {
    return (
      <>
        <SectionList
          stickySectionHeadersEnabled={false}
          ListHeaderComponent={<HomeHeader title={homeViewModel.title} />}
          sections={homeViewModel.rows}
          renderItem={renderItem}
          renderSectionHeader={({ section: { sectionViewModel } }) => {
            return sectionViewModel !== undefined ? (
              <HomeSectionRow viewModel={sectionViewModel} />
            ) : null
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={fetchData}
              colors={[Colors.primaryColor]}
            />
          }
          keyExtractor={(item, index) => item.type + index}
        />
      </>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatefulView contentComponent={HomeContent} state={statefulState} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
})

export default HomeScreen
