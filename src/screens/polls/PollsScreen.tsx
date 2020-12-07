import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  View,
  Image,
  RefreshControl,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Spacing } from '../../styles'
import PollRow from './PollRow'
import PollHighlightedRow from './PollHighlightedRow'
import PollsHeader from './PollsHeader'
import { Colors } from '../../styles'
import { PollRowViewModel } from './PollRowViewModel'
import { PollsScreenViewModelMapper } from './PollsScreenViewModelMapper'
import { PollsScreenProps, Screen } from '../../navigation'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { PollsScreenViewModel } from './PollsScreenViewModel'
import { useTheme } from '../../themes'
import { GetPollsInteractor } from '../../core/interactor/GetPollsInteractor'

const PollsScreen = ({ navigation }: PollsScreenProps) => {
  const { theme } = useTheme()
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<PollsScreenViewModel>
  >(new ViewState.Loading())
  const [isRefreshing, setRefreshing] = useState(true)

  const refresh = () => {
    setRefreshing(true)
    new GetPollsInteractor()
      .execute()
      .then((polls) => {
        const viewModel = PollsScreenViewModelMapper.map(theme, polls)
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
      .finally(() => setRefreshing(false))
  }

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

  useEffect(refresh, [theme])

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
            <Image source={theme.image.emptyPoll()} style={styles.emptyImage} />
          </View>
        }
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            colors={[theme.primaryColor]}
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
    flex: 1,
    backgroundColor: Colors.defaultBackground,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: Spacing.largeMargin,
  },
  header: {
    marginBottom: Spacing.margin,
  },
  emptyContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 141,
    height: 166,
  },
})

export default PollsScreen
