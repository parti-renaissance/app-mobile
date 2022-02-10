import React from 'react'
import {
  FlatList,
  Text,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import LoaderView from '../shared/LoaderView'
import { StatefulView } from '../shared/StatefulView'
import NewsContentViewModel from './NewsContentViewModel'
import NewsRow from './NewsRow'
import { NewsRowViewModel } from './NewsRowViewModel'
import { useNewsScreen } from './useNewsScreen.hook'

const Separator = () => {
  return <View style={styles.separator} />
}

const NewsScreen = () => {
  const {
    statefulState,
    isLoadingMore,
    isRefreshing,
    loadFirstPage,
    loadMore,
    onNewsSelected,
  } = useNewsScreen()

  const renderItem = ({ item }: ListRenderItemInfo<NewsRowViewModel>) => {
    return <NewsRow viewModel={item} onPress={() => onNewsSelected(item.id)} />
  }

  const NewsContent = (viewModel: NewsContentViewModel) => {
    return (
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={viewModel.rows}
        renderItem={renderItem}
        ListHeaderComponent={
          <Text style={styles.title}>{i18n.t('news.title')}</Text>
        }
        ListFooterComponent={
          isLoadingMore ? <LoaderView style={styles.bottomLoader} /> : null
        }
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={loadFirstPage}
            colors={[Colors.primaryColor]}
          />
        }
        onEndReachedThreshold={0.8}
        onEndReached={loadMore}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatefulView state={statefulState} contentComponent={NewsContent} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    ...Typography.largeTitle,
    marginBottom: Spacing.mediumMargin,
    marginHorizontal: Spacing.margin,
  },
  bottomLoader: {
    margin: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    paddingTop: Spacing.largeMargin,
  },
  image: {
    aspectRatio: 288 / 103,
    height: undefined,
    width: '100%',
  },
  imageContainer: {
    paddingHorizontal: Spacing.margin,
  },
  separator: {
    backgroundColor: Colors.separator,
    height: Spacing.separatorHeight,
    marginHorizontal: Spacing.margin,
  },
})

export default NewsScreen
