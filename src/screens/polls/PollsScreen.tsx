import React, { useCallback, useState } from 'react'
import {
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  View,
  RefreshControl,
  Text,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Spacing, Typography } from '../../styles'
import PollRow from './PollRow'
import PollHighlightedRow from './PollHighlightedRow'
import PollsHeader from './PollsHeader'
import { Colors } from '../../styles'
import { PollRowViewModel } from './PollRowViewModel'
import { PollsScreenViewModelMapper } from './PollsScreenViewModelMapper'
import { PollsScreenProps, Screen } from '../../navigation'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { PollsScreenViewModel } from './PollsScreenViewModel'
import { GetPollsInteractor } from '../../core/interactor/GetPollsInteractor'
import { ServerTimeoutError } from '../../core/errors'
import { useFocusEffect } from '@react-navigation/native'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import CircularIcon from '../shared/CircularIcon'
import i18n from '../../utils/i18n'

const PollsScreen = ({ navigation }: PollsScreenProps) => {
  const [statefulState, setStatefulState] = useState<
    ViewState<PollsScreenViewModel>
  >(ViewState.Loading())
  const [isRefreshing, setRefreshing] = useState(true)
  const [initialFetchDone, setInitialFetchDone] = useState(false)

  const fetchData = useCallback((cacheJustLoaded: boolean = false) => {
    setRefreshing(true)
    return new GetPollsInteractor()
      .execute('remote')
      .then((polls) => {
        const viewModel = PollsScreenViewModelMapper.map(polls)
        setStatefulState(ViewState.Content(viewModel))
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
      .finally(() => setRefreshing(false))
  }, [])

  const firstDataFetch = useCallback(() => {
    new GetPollsInteractor()
      .execute('cache')
      .then((cachedPolls) => {
        const viewModel = PollsScreenViewModelMapper.map(cachedPolls)
        setStatefulState(ViewState.Content(viewModel))
        if (!initialFetchDone) {
          fetchData(true)
          setInitialFetchDone(true)
        }
      })
      .catch(() => {
        fetchData()
      })
  }, [fetchData, initialFetchDone])

  const navigationToPollDetail = (viewModelId: string) => {
    const pollId = parseInt(viewModelId, 10)
    navigation.navigate(Screen.pollDetailModal, {
      screen: Screen.pollDetail,
      params: { pollId: pollId },
    })
  }

  const renderItem = ({
    item,
    index,
  }: ListRenderItemInfo<PollRowViewModel>) => {
    if (index === 0) {
      return (
        <PollHighlightedRow
          viewModel={item}
          onPress={() => navigationToPollDetail(item.id)}
        />
      )
    } else {
      return (
        <PollRow
          viewModel={item}
          onPress={() => navigationToPollDetail(item.id)}
        />
      )
    }
  }

  useFocusEffect(firstDataFetch)

  const PollContent = (viewModel: PollsScreenViewModel) => {
    return (
      <FlatList
        data={viewModel.rows}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <PollsHeader style={styles.header} viewModel={viewModel.header} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <CircularIcon
              style={styles.emptyIcon}
              source={require('../../assets/images/emptyPollIcon.png')}
            />
            <Text style={styles.emptyText}>
              {i18n.t('polls.subtitle_no_polls')}
            </Text>
          </View>
        }
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={fetchData}
            colors={[Colors.primaryColor]}
          />
        }
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatefulView state={statefulState} contentComponent={PollContent} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: Spacing.largeMargin,
  },
  emptyContainer: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    padding: Spacing.margin,
  },
  emptyIcon: {
    marginBottom: Spacing.margin,
  },
  emptyText: {
    ...Typography.body,
    textAlign: 'center',
  },
  header: {
    marginBottom: Spacing.margin,
    marginTop: Spacing.margin,
  },
})

export default PollsScreen
