import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  ScrollView,
} from 'react-native'
import { Colors, Typography } from '../../styles'
import { useTheme, useThemedStyles } from '../../themes'
import { BuildingDetailScreenProp, Screen } from '../../navigation'
import BuildingStatusView from './BuilidingStatusView'
import { margin, mediumMargin } from '../../styles/spacing'
import BuildingLayoutView from './BuildingLayoutView'
import { BuildingDetailScreenViewModelMapper } from './BuildingDetailScreenViewModelMapper'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import Theme from '../../themes/Theme'
import i18n from '../../utils/i18n'
import BuildingVisitsHistoryView from './BuildingVisitsHistoryView'
import DoorToDoorRepository from '../../data/DoorToDoorRepository'
import { BuildingHistoryPoint } from '../../core/entities/BuildingHistory'

enum Tab {
  HISTORY,
  LAYOUT,
}

const BuildingDetailScreen: FunctionComponent<BuildingDetailScreenProp> = ({
  navigation,
  route,
}) => {
  const styles = useThemedStyles(stylesFactory)
  const { theme } = useTheme()
  const [tab, setTab] = useState(Tab.LAYOUT)
  const [history, setHistory] = useState<BuildingHistoryPoint[]>([])
  const [layout, setLayout] = useState<void>()
  const viewModel = BuildingDetailScreenViewModelMapper.map(
    route.params.address,
    history,
    theme,
  )

  useEffect(() => {
    const fetchHistory = () => {
      DoorToDoorRepository.getInstance()
        .buildingHistory(
          route.params.address.building.id,
          route.params.address.building.campaignStatistics.campaignId,
        )
        .then((value) => {
          setHistory(value)
        })
        .catch(() => {
          // TODO (Denis Poifol) 2021/12/16 handle error and empty array returned from WS
        })
    }

    const fetchLayout = () => {
      DoorToDoorRepository.getInstance()
        .buildingBlocks(
          route.params.address.building.id,
          route.params.address.building.campaignStatistics.campaignId,
        )
        .then((value) => {
          setLayout(value)
        })
        .catch(() => {
          // TODO (Denis Poifol) 2021/12/16 handle error and empty array returned from WS
        })
    }

    fetchHistory()
    fetchLayout()
  }, [
    route.params.address.building.campaignStatistics.campaignId,
    route.params.address.building.id,
  ])

  const showHistory = () => {
    setTab(Tab.HISTORY)
  }

  const showLayout = () => {
    setTab(Tab.LAYOUT)
  }

  const renderTab = (currentTab: Tab) => {
    switch (currentTab) {
      case Tab.HISTORY:
        return <BuildingVisitsHistoryView viewModel={viewModel.history} />
      case Tab.LAYOUT:
        return (
          <BuildingLayoutView
            viewModel={viewModel.buildingLayout}
            onSelect={() => {
              navigation.navigate(Screen.doorToDoorTunnelModal, {
                screen: Screen.tunnelDoorInterlocutor,
                params: {
                  campaignId: viewModel.campaignId,
                },
              })
            }}
          />
        )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={viewModel.illustration} />
        <Text style={styles.address}>{viewModel.address}</Text>
        <Text style={styles.lastVisit}>{viewModel.lastVisit}</Text>
        <BuildingStatusView viewModel={viewModel.status} />
        {/* The tabbar is simulated here and we are not using TabView from react-native-tab-view 
            because we need to be able to scroll through the content of the tabs and react-native-tab-view
            does not provide us with a way to do it. */}
        <View style={styles.tabbarContainer}>
          <TouchablePlatform
            touchHighlight={Colors.touchHighlight}
            onPress={showHistory}
          >
            <View style={tab === Tab.HISTORY ? styles.selectedTab : styles.tab}>
              <Text
                style={
                  tab === Tab.HISTORY ? styles.selectedTabText : styles.tabText
                }
              >
                {i18n.t('building.tabs.history')}
              </Text>
            </View>
          </TouchablePlatform>
          <TouchablePlatform
            touchHighlight={Colors.touchHighlight}
            onPress={showLayout}
          >
            <View style={tab === Tab.LAYOUT ? styles.selectedTab : styles.tab}>
              <Text
                style={
                  tab === Tab.LAYOUT ? styles.selectedTabText : styles.tabText
                }
              >
                {i18n.t('building.tabs.layout')}
              </Text>
            </View>
          </TouchablePlatform>
        </View>
        {renderTab(tab)}
      </ScrollView>
    </SafeAreaView>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    address: {
      ...Typography.title2,
      marginTop: mediumMargin,
      textAlign: 'center',
    },
    container: {
      backgroundColor: Colors.defaultBackground,
      flex: 1,
    },
    lastVisit: {
      ...Typography.body,
      marginBottom: margin,
      textAlign: 'center',
    },
    selectedTab: {
      borderBottomWidth: 2,
      borderColor: theme.primaryColor,
      margin: margin,
      textAlign: 'center',
    },
    selectedTabText: {
      ...Typography.headline,
    },
    tab: {
      margin: margin,
      textAlign: 'center',
    },
    tabText: {
      ...Typography.thinHeadline,
    },
    tabbarContainer: {
      ...Typography.callout,
      flexDirection: 'row',
      justifyContent: 'center',
    },
  })
}

export default BuildingDetailScreen
