import React, { FunctionComponent } from 'react'
import {
  Text,
  RefreshControl,
  StyleSheet,
  View,
  SectionList,
  SectionListRenderItemInfo,
  SectionListData,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { NewsNavigatorScreenProps } from '../../navigation/news/NewsNavigatorScreenProps'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import LoaderView from '../shared/LoaderView'
import { SectionHeader } from '../shared/SectionHeader'
import { StatefulView } from '../shared/StatefulView'
import HighlightedNewsRow from './HighlightedNewsRow'
import {
  NewsContentSectionViewModel,
  NewsContentViewModel,
} from './NewsContentViewModel'
import NewsRow from './NewsRow'
import { NewsRowViewModel } from './NewsRowViewModel'
import { useNewsScreen } from './useNewsScreen.hook'

type NewsScreenProps = NewsNavigatorScreenProps<'News'>

const Separator = () => {
  return <View style={styles.separator} />
}

const NewsScreen: FunctionComponent<NewsScreenProps> = () => {
  const {
    statefulState,
    isLoadingMore,
    isRefreshing,
    refetch,
    loadMore,
    onNewsSelected,
  } = useNewsScreen()

  const renderItem = ({
    section,
    item,
    index,
  }: SectionListRenderItemInfo<
    NewsRowViewModel,
    NewsContentSectionViewModel
  >) => {
    if (section.isHighlighted) {
      const isLastItemInSection = index === section.data.length - 1
      return (
        <HighlightedNewsRow
          viewModel={item}
          onPress={() => onNewsSelected(item.id)}
          style={isLastItemInSection && { paddingBottom: Spacing.margin }}
        />
      )
    } else {
      return (
        <NewsRow viewModel={item} onPress={() => onNewsSelected(item.id)} />
      )
    }
  }

  const renderSectionHeader = (info: {
    section: SectionListData<NewsRowViewModel, NewsContentSectionViewModel>
  }) => {
    if (info.section.title === undefined) {
      return null
    }
    return (
      <SectionHeader
        title={info.section.title}
        isHighlighted={info.section.isHighlighted}
      />
    )
  }

  const NewsContent = (viewModel: NewsContentViewModel) => {
    return (
      <SectionList
        contentContainerStyle={styles.contentContainer}
        sections={viewModel.sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={
          <Text style={styles.title}>{i18n.t('news.title')}</Text>
        }
        ListFooterComponent={
          isLoadingMore ? <LoaderView style={styles.bottomLoader} /> : null
        }
        ItemSeparatorComponent={(props: {
          section: NewsContentSectionViewModel
        }) => {
          return props.section.isHighlighted ? null : <Separator />
        }}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refetch}
            colors={[Colors.primaryColor]}
          />
        }
        onEndReachedThreshold={0.8}
        onEndReached={loadMore}
        stickySectionHeadersEnabled={false}
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
  separator: {
    backgroundColor: Colors.separator,
    height: Spacing.separatorHeight,
    marginHorizontal: Spacing.margin,
  },
})

export default NewsScreen
