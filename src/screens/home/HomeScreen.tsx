import React, { FunctionComponent, useEffect } from 'react'
import {
  StyleSheet,
  SectionList,
  SectionListRenderItemInfo,
  RefreshControl,
  View,
  StatusBar,
  SectionListData,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'

import { HomeScreenProps, Screen } from '../../navigation'
import { Colors } from '../../styles'
import { StatefulView } from '../shared/StatefulView'
import HomeHeader from './HomeHeader'
import HomePollRowContainer from './HomePollRowContainer'
import HomeRegion from './HomeRegion'
import { HomeRowViewModel, HomeSectionViewModel } from './HomeRowViewModel'
import HomeToolRowContainer from './tools/HomeToolRowContainer'
import { HomeViewModel } from './HomeViewModel'
import HomeNewsRowContainer from './news/HomeNewsRowContainer'
import HomeQuickPollRowContainer from './quickPoll/HomeQuickPollRowContainer'
import { HomeEventRowContainer } from './events/HomeEventRowContainer'
import { ProfileButton } from '../shared/NavigationHeaderButton'
import { HomeRetaliationRowContainer } from './retaliation/HomeRetaliationRowContainer'
import { useHomeScreen } from './useHomeScreen.hook'
import HomeSectionHeader from './HomeSectionHeader'
import { HomeFeedEventRow } from './feed/HomeFeedEventRow'
import { HomeFeedNewsRow } from './feed/HomeFeedNewsRow'
import { HomeFeedPhoningCampaignsRow } from './feed/HomeFeedPhoningCampaignsRow'

const HomeScreen: FunctionComponent<HomeScreenProps> = ({ navigation }) => {
  const {
    statefulState,
    isRefreshing,
    onRefresh,
    onPollSelected,
    onNewsSelected,
    onToolSelected,
    onNewsMorePressed,
    onPollsMorePressed,
    onToolsMorePressed,
    onRegionMorePressed,
    onQuickPollAnswerSelected,
    onEventSelected,
    onRetaliationSelected,
    onRetaliateSelected,
    onFeedNewsSelected,
    onFeedPhoningCampaignsSelected,
  } = useHomeScreen()

  useEffect(() => {
    const navigationToProfile = () => {
      navigation.navigate(Screen.profileModal)
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
      <HomeSectionHeader
        title={viewModel.sectionName}
        isHighlighted={viewModel?.isHighlighted}
      />
    )
  }

  const renderItem = ({
    section,
    item,
  }: SectionListRenderItemInfo<HomeRowViewModel, HomeSectionViewModel>) => {
    if (item.type === 'news') {
      return (
        <HomeNewsRowContainer
          viewModel={item.value}
          onNewsSelected={onNewsSelected}
          onMorePressed={onNewsMorePressed}
        />
      )
    } else if (item.type === 'polls') {
      return (
        <HomePollRowContainer
          viewModel={item.value}
          onPollSelected={onPollSelected}
          onMorePressed={onPollsMorePressed}
        />
      )
    } else if (item.type === 'tools') {
      return (
        <HomeToolRowContainer
          viewModel={item.value}
          onMorePressed={onToolsMorePressed}
          onToolSelected={onToolSelected}
        />
      )
    } else if (item.type === 'region') {
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
          onEventSelected={onEventSelected}
        />
      )
    } else if (item.type === 'retaliation') {
      return (
        <HomeRetaliationRowContainer
          viewModel={item.value}
          onRetaliationSelected={onRetaliationSelected}
          onRetaliateSelected={onRetaliateSelected}
        />
      )
    } else if (item.type === 'feedEvent') {
      return (
        <HomeFeedEventRow
          viewModel={item.value}
          onEventSelected={onEventSelected}
        />
      )
    } else if (item.type === 'feedNews') {
      return (
        <HomeFeedNewsRow
          viewModel={item.value}
          onNewsSelected={onFeedNewsSelected}
        />
      )
    } else if (item.type === 'feedPhoningCampaigns') {
      return (
        <HomeFeedPhoningCampaignsRow
          viewModel={item.value}
          onPhoningCampaignsSelected={onFeedPhoningCampaignsSelected}
        />
      )
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
        />
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
      {/* We need the <StatusBar> component for Android */}
      <StatusBar translucent backgroundColor="transparent" />
      <StatefulView contentComponent={HomeContent} state={statefulState} />
    </SafeAreaView>
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
