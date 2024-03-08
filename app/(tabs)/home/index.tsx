import React, { FunctionComponent, useEffect } from 'react'
import {
  RefreshControl,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import { router, useNavigation } from 'expo-router'
import { HomeNavigatorScreenProps } from '@/navigation/home/HomeNavigatorScreenProps'
import { Colors } from '@/styles'
import { ListFooterLoader } from '@/screens/shared/ListFooterLoader'
import { ProfileButton } from '@/screens/shared/NavigationHeaderButton'
import { SectionHeader } from '@/screens/shared/SectionHeader'
import { StatefulView } from '@/screens/shared/StatefulView'
import { HomeEventRowContainer } from '@/screens/home/events/HomeEventRowContainer'
import { HomeFeedDoorToDoorCampaignRow } from '@/screens/home/feed/HomeFeedDoorToDoorCampaignRow'
import { HomeFeedErrorRow } from '@/screens/home/feed/HomeFeedErrorRow'
import { HomeFeedEventRow } from '@/screens/home/feed/HomeFeedEventRow'
import { HomeFeedNewsRow } from '@/screens/home/feed/HomeFeedNewsRow'
import { HomeFeedPhoningCampaignRow } from '@/screens/home/feed/HomeFeedPhoningCampaignRow'
import { HomeFeedPollRow } from '@/screens/home/feed/HomeFeedPollRow'
import { HomeFeedRetaliationRow } from '@/screens/home/feed/HomeFeedRetaliationRow'
import HomeHeader from '@/screens/home/HomeHeader'
import HomeRegion from '@/screens/home/HomeRegion'
import {
  HomeRowViewModel,
  HomeSectionViewModel,
} from '@/screens/home/HomeRowViewModel'
import { HomeViewModel } from '@/screens/home/HomeViewModel'
import HomeQuickPollRowContainer from '@/screens/home/quickPoll/HomeQuickPollRowContainer'
import { useHomeScreen } from '@/screens/home/useHomeScreen.hook'

type HomeScreenProps = HomeNavigatorScreenProps<'Home'>

const HomeScreen: FunctionComponent<HomeScreenProps> = () => {
  const {
    statefulState,
    isRefreshing,
    isLoadingMore,
    onRefresh,
    onRegionMorePressed,
    onQuickPollAnswerSelected,
    onNextEventSelected,
    onRetaliationSelected,
    onRetaliateSelected,
    onFeedNewsSelected,
    onFeedEventSelected,
    onFeedPhoningCampaignSelected,
    onFeedDoorToDoorCampaignSelected,
    onFeedPollSelected,
    onLoadMore,
  } = useHomeScreen()

  const navigation = useNavigation()

  useEffect(() => {
    const navigationToProfile = () => {
      router.push('/(tabs)/home/profile/')
    }
    navigation.setOptions({
      headerRight: () => <ProfileButton onPress={navigationToProfile} />,
    })
  }, [navigation])

  const renderSectionHeader = (info: {
    section: SectionListData<HomeRowViewModel, HomeSectionViewModel>
  }) => {
    const viewModel = info.section.sectionViewModel
    if (viewModel === undefined) {
      return null
    }
    return (
      <SectionHeader
        title={viewModel.sectionName}
        isHighlighted={viewModel?.isHighlighted}
      />
    )
  }

  const renderItem = ({
    section,
    item,
  }: SectionListRenderItemInfo<HomeRowViewModel, HomeSectionViewModel>) => {
    if (item.type === 'region') {
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
      const isHighlighted = section.sectionViewModel?.isHighlighted ?? false
      return (
        <HomeEventRowContainer
          viewModel={item.value}
          isHighlighted={isHighlighted}
          onEventSelected={onNextEventSelected}
        />
      )
    } else if (item.type === 'feedEvent') {
      return (
        <HomeFeedEventRow
          viewModel={item.value}
          onEventSelected={onFeedEventSelected}
        />
      )
    } else if (item.type === 'feedNews') {
      return (
        <HomeFeedNewsRow
          viewModel={item.value}
          onNewsSelected={onFeedNewsSelected}
        />
      )
    } else if (item.type === 'feedPhoningCampaign') {
      return (
        <HomeFeedPhoningCampaignRow
          viewModel={item.value}
          onPhoningCampaignSelected={onFeedPhoningCampaignSelected}
        />
      )
    } else if (item.type === 'feedDoorToDoorCampaign') {
      return (
        <HomeFeedDoorToDoorCampaignRow
          viewModel={item.value}
          onDoorToDoorCampaignSelected={onFeedDoorToDoorCampaignSelected}
        />
      )
    } else if (item.type === 'feedPoll') {
      return (
        <HomeFeedPollRow
          viewModel={item.value}
          onPollSelected={onFeedPollSelected}
        />
      )
    } else if (item.type === 'feedRetaliation') {
      return (
        <HomeFeedRetaliationRow
          viewModel={item.value}
          onRetaliationSelected={onRetaliationSelected}
          onRetaliateSelected={onRetaliateSelected}
        />
      )
    } else if (item.type === 'error') {
      return <HomeFeedErrorRow state={item.value} />
    } else {
      return null
    }
  }

  const HomeContent = (homeViewModel: HomeViewModel) => {
    return (
      <View style={styles.contentContainer}>
        <SectionList
          stickySectionHeadersEnabled={false}
          ListHeaderComponent={<HomeHeader viewModel={homeViewModel.header} />}
          ListFooterComponent={isLoadingMore ? <ListFooterLoader /> : null}
          sections={homeViewModel.rows}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={[Colors.primaryColor]}
            />
          }
          keyExtractor={(item, index) => item.type + index}
          onEndReachedThreshold={0.8}
          onEndReached={onLoadMore}
        />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {/* We need the <StatusBar> component for Android */}
      <StatusBar translucent backgroundColor="transparent" />
      <StatefulView contentComponent={HomeContent} state={statefulState} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    overflow: 'hidden',
  },
})

export default HomeScreen
