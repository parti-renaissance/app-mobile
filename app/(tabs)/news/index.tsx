import React, { FunctionComponent } from 'react'
import { RefreshControl, SectionList, SectionListData, SectionListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import { NewsNavigatorScreenProps } from '@/navigation/news/NewsNavigatorScreenProps'
import HighlightedNewsRow from '@/screens/news/HighlightedNewsRow'
import { NewsContentSectionViewModel, NewsContentViewModel } from '@/screens/news/NewsContentViewModel'
import NewsRow from '@/screens/news/NewsRow'
import { NewsRowViewModel } from '@/screens/news/NewsRowViewModel'
import { useNewsScreen } from '@/screens/news/useNewsScreen.hook'
import LoaderView from '@/screens/shared/LoaderView'
import { SectionHeader } from '@/screens/shared/SectionHeader'
import { StatefulView } from '@/screens/shared/StatefulView'
import { Colors, Spacing, Typography } from '@/styles'
import i18n from '@/utils/i18n'

type NewsScreenProps = NewsNavigatorScreenProps<'News'>

const Separator = () => {
  return <View style={styles.separator} />
}

const NewsScreen: FunctionComponent<NewsScreenProps> = () => {
  const { statefulState, isLoadingMore, isRefreshing, loadFirstPage, loadMore, onNewsSelected } = useNewsScreen()

  const renderItem = ({ section, item, index }: SectionListRenderItemInfo<NewsRowViewModel, NewsContentSectionViewModel>) => {
    if (section.isHighlighted) {
      const isLastItemInSection = index === section.data.length - 1
      return <HighlightedNewsRow viewModel={item} onPress={() => onNewsSelected(item.id)} style={isLastItemInSection && { paddingBottom: Spacing.margin }} />
    } else {
      return <NewsRow viewModel={item} onPress={() => onNewsSelected(item.id)} />
    }
  }

  const renderSectionHeader = (info: { section: SectionListData<NewsRowViewModel, NewsContentSectionViewModel> }) => {
    if (info.section.title === undefined) {
      return null
    }
    return <SectionHeader title={info.section.title} isHighlighted={info.section.isHighlighted} />
  }

  const NewsContent = (viewModel: NewsContentViewModel) => {
    return (
      <SectionList
        contentContainerStyle={styles.contentContainer}
        sections={viewModel.sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={<Text style={styles.title}>{i18n.t('news.title')}</Text>}
        ListFooterComponent={isLoadingMore ? <LoaderView style={styles.bottomLoader} /> : null}
        ItemSeparatorComponent={(props: { section: NewsContentSectionViewModel }) => {
          return props.section.isHighlighted ? null : <Separator />
        }}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={loadFirstPage} colors={[Colors.primaryColor]} />}
        onEndReachedThreshold={0.8}
        onEndReached={loadMore}
        stickySectionHeadersEnabled={false}
      />
    )
  }

  return (
    <View style={styles.container}>
      <StatefulView state={statefulState} contentComponent={NewsContent} />
    </View>
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
