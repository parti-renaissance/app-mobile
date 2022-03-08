import React, { FC } from 'react'
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
import { StatefulView } from '../shared/StatefulView'
import { PollsScreenViewModel } from './PollsScreenViewModel'
import CircularIcon from '../shared/CircularIcon'
import i18n from '../../utils/i18n'
import { ActionsNavigatorScreenProps } from '../../navigation/actions/ActionsNavigatorScreenProps'
import { usePollsScreen } from './usePollsScreen.hook'

type PollsScreenProps = ActionsNavigatorScreenProps<'Polls'>

const PollsScreen: FC<PollsScreenProps> = () => {
  const {
    statefulState,
    isRefreshing,
    onPollSelected,
    onRefresh,
  } = usePollsScreen()

  const renderItem = ({
    item,
    index,
  }: ListRenderItemInfo<PollRowViewModel>) => {
    if (index === 0) {
      return (
        <PollHighlightedRow
          viewModel={item}
          onPress={() => onPollSelected(item.id)}
        />
      )
    } else {
      return (
        <PollRow viewModel={item} onPress={() => onPollSelected(item.id)} />
      )
    }
  }

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
            onRefresh={onRefresh}
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
