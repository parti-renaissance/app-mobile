import React, { FunctionComponent, useCallback } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  Dimensions,
} from 'react-native'
import { Colors, Typography } from '../../styles'
import { useTheme, useThemedStyles } from '../../themes'
import { BuildingDetailScreenProp } from '../../navigation'
import i18n from '../../utils/i18n'
import BuildingStatusView from './BuilidingStatusView'
import { margin, mediumMargin } from '../../styles/spacing'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import BuildingLayoutView from './BuildingLayoutView'
import { BuildingType } from './BuildingLayoutViewModelMapper'
import { BuildingDetailScreenViewModelMapper } from './BuildingDetailScreenViewModelMapper'

const BuildingDetailScreen: FunctionComponent<BuildingDetailScreenProp> = ({}) => {
  const styles = useThemedStyles(stylesFactory)
  const { theme } = useTheme()
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'history', title: i18n.t('building.tabs.history') },
    { key: 'layout', title: i18n.t('building.tabs.layout') },
  ])
  const initialLayout = { width: Dimensions.get('window').width }
  const viewModel = BuildingDetailScreenViewModelMapper.map(
    BuildingType.APPARTEMENT_BUILDING,
    theme,
  )

  const History = useCallback(() => <View />, [])
  const Layout = useCallback(
    () => (
      <BuildingLayoutView
        viewModel={viewModel.buildingLayout}
        onSelect={() => console.log('action selected')}
      />
    ),
    [viewModel.buildingLayout],
  )

  const renderScene = SceneMap({
    history: History,
    layout: Layout,
  })
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      activeColor={Colors.darkText}
      inactiveColor={Colors.darkText}
      indicatorStyle={{ backgroundColor: theme.primaryColor }}
      style={{
        backgroundColor: Colors.defaultBackground,
      }}
      indicatorContainerStyle={{
        width: Dimensions.get('screen').width,
      }}
      tabStyle={styles.tabStyle}
      labelStyle={{ ...Typography.subheadline }}
      getLabelText={({ route }) => route.title}
    />
  )
  return (
    <SafeAreaView style={styles.container}>
      <View />
      <Image source={viewModel.illustration} />
      <Text style={styles.address}>{viewModel.address}</Text>
      <Text style={styles.lastVisit}>{viewModel.lastVisit}</Text>
      <BuildingStatusView viewModel={viewModel.status} />
      {/* @ts-ignore https://github.com/satya164/react-native-tab-view/issues/1159 */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  )
}

const stylesFactory = () => {
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
    tabStyle: {
      width: Dimensions.get('screen').width / 2,
    },
  })
}

export default BuildingDetailScreen
