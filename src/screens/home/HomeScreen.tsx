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
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useNavigation } from 'expo-router'
import { HomeNavigatorScreenProps } from '../../navigation/home/HomeNavigatorScreenProps'
import { Colors } from '../../styles'
import { ListFooterLoader } from '../shared/ListFooterLoader'
import { ProfileButton } from '../shared/NavigationHeaderButton'
import { SectionHeader } from '../shared/SectionHeader'
import { StatefulView } from '../shared/StatefulView'
import { HomeEventRowContainer } from './events/HomeEventRowContainer'
import { HomeFeedDoorToDoorCampaignRow } from './feed/HomeFeedDoorToDoorCampaignRow'
import { HomeFeedErrorRow } from './feed/HomeFeedErrorRow'
import { HomeFeedEventRow } from './feed/HomeFeedEventRow'
import { HomeFeedNewsRow } from './feed/HomeFeedNewsRow'
import { HomeFeedPhoningCampaignRow } from './feed/HomeFeedPhoningCampaignRow'
import { HomeFeedPollRow } from './feed/HomeFeedPollRow'
import { HomeFeedRetaliationRow } from './feed/HomeFeedRetaliationRow'
import HomeHeader from './HomeHeader'
import HomeRegion from './HomeRegion'
import { HomeRowViewModel, HomeSectionViewModel } from './HomeRowViewModel'
import { HomeViewModel } from './HomeViewModel'
import HomeQuickPollRowContainer from './quickPoll/HomeQuickPollRowContainer'
import { useHomeScreen } from './useHomeScreen.hook'

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
      router.push('/(tabs)/home/profile')
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
