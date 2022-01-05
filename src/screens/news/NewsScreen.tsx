import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import NewsRepository from '../../data/NewsRepository'
import ProfileRepository from '../../data/ProfileRepository'
import { Colors, Spacing } from '../../styles'
import { ExternalLink } from '../shared/ExternalLink'
import LoaderView from '../shared/LoaderView'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import NewsContentViewModel from './NewsContentViewModel'
import { NewsContentViewModelMapper } from './NewsContentViewModelMapper'
import NewsRow from './NewsRow'
import { NewsRowViewModel } from './NewsRowViewModel'

const Separator = () => {
  return <View style={styles.separator} />
}

const NewsScreen = () => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<NewsContentViewModel>
  >(new ViewState.Loading())
  const [isRefreshing, setRefreshing] = useState(true)
  const [isLoadingMore, setLoadingMore] = useState(false)
  const fetchNews = async (page: number) => {
    const zipCode = await ProfileRepository.getInstance().getZipCode()
    return NewsRepository.getInstance().getNews(zipCode, page)
  }

  const loadFirstPage = () => {
    setRefreshing(true)
    fetchNews(1)
      .then((paginatedResult) => {
        const content = NewsContentViewModelMapper.map(paginatedResult)
        setStatefulState(new ViewState.Content(content))
      })
      .catch((error) => {
        setStatefulState(
          ViewStateUtils.networkError(error, () => {
            setStatefulState(new ViewState.Loading())
            loadFirstPage()
          }),
        )
      })
      .finally(() => setRefreshing(false))
  }

  const loadMore = () => {
    const currentState = statefulState
    if (currentState instanceof ViewState.Content) {
      const content = currentState.content
      const paginationInfo = content.paginationInfo
      if (paginationInfo.currentPage === paginationInfo.lastPage) {
        // last page reached : nothing to paginate
        return
      }
      setLoadingMore(true)
      fetchNews(paginationInfo.currentPage + 1)
        .then((paginatedResult) => {
          const newContent = NewsContentViewModelMapper.map(
            paginatedResult,
            content,
          )
          setStatefulState(new ViewState.Content(newContent))
        })
        .catch((error) => {
          console.log(error)
          // no-op: next page can be reloaded by reaching the end of the list again
        })
        .finally(() => setLoadingMore(false))
    }
  }

  useEffect(loadFirstPage, [])

  const renderItem = ({ item }: ListRenderItemInfo<NewsRowViewModel>) => {
    return (
      <NewsRow
        viewModel={item}
        onPress={(url) => {
          ExternalLink.openUrl(url)
        }}
      />
    )
  }

  const NewsContent = (viewModel: NewsContentViewModel) => {
    return (
      <FlatList
        data={viewModel.rows}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/images/blue/imageActualite.png')}
            />
          </View>
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
  bottomLoader: {
    margin: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
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
