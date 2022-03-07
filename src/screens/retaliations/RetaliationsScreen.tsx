import React, { FC } from 'react'
import {
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { StatefulView } from '../shared/StatefulView'
import { useRetaliationsScreen } from './useRetaliationsScreen.hook'
import HomeRetaliationCard from './RetaliationListCard'
import { ActionsNavigatorScreenProps } from '../../navigation/actions/ActionsNavigatorScreenProps'
import { RetaliationListCardViewModel } from './RetaliationListCardViewModel'

type RetaliationsScreenProps = ActionsNavigatorScreenProps<'Retaliations'>

export const RetaliationsScreen: FC<RetaliationsScreenProps> = () => {
  const {
    statefulState,
    isRefreshing,
    onRefresh,
    onRetaliateSelected,
    onRetaliationSelected,
  } = useRetaliationsScreen()

  const renderItem = ({
    item,
  }: ListRenderItemInfo<RetaliationListCardViewModel>) => {
    return (
      <HomeRetaliationCard
        viewModel={item}
        onRetaliateSelected={onRetaliateSelected}
        onRetaliationSelected={onRetaliationSelected}
      />
    )
  }

  const RetaliationsContent = (
    content: Array<RetaliationListCardViewModel>,
  ) => {
    return (
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={content}
        keyExtractor={(item) => item.title}
        ListHeaderComponent={
          <Text style={styles.title}>{i18n.t('retaliations.title')}</Text>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>{i18n.t('retaliations.empty')}</Text>
        }
        renderItem={renderItem}
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
      <StatefulView
        state={statefulState}
        contentComponent={RetaliationsContent}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.margin,
  },
  empty: {
    ...Typography.body,
    color: Colors.darkText,
    marginTop: Spacing.margin,
  },
  title: {
    ...Typography.highlightedLargeTitle,
    marginBottom: Spacing.mediumMargin,
    marginTop: Spacing.margin,
  },
})
