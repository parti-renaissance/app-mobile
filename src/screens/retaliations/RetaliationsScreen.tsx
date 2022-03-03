import React, { FC } from 'react'
import { Text, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { StatefulView } from '../shared/StatefulView'
import { useRetaliationsScreen } from './useRetaliationsScreen.hook'
import HomeRetaliationCard from '../home/retaliation/HomeRetaliationCard'
import { HomeRetaliationCardViewModel } from '../home/retaliation/HomeRetaliationCardViewModel'
import { ActionsNavigatorScreenProps } from '../../navigation/ActionsNavigator'

type RetaliationsScreenProps = ActionsNavigatorScreenProps<'Retaliations'>

export const RetaliationsScreen: FC<RetaliationsScreenProps> = () => {
  const {
    statefulState,
    onRetaliateSelected,
    onRetaliationSelected,
  } = useRetaliationsScreen()

  const renderItem = ({
    item,
  }: ListRenderItemInfo<HomeRetaliationCardViewModel>) => {
    return (
      <HomeRetaliationCard
        viewModel={item}
        onRetaliateSelected={onRetaliateSelected}
        onRetaliationSelected={onRetaliationSelected}
      />
    )
  }

  const RetaliationsContent = (
    content: Array<HomeRetaliationCardViewModel>,
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
