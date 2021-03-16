import React from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { Colors, Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'
import i18n from '../../utils/i18n'
import EventListScreen from './EventListScreen'

const Home = () => <EventListScreen eventFilter="home" />
const Calendar = () => <EventListScreen eventFilter="calendar" />
const MyEvents = () => <EventListScreen eventFilter="myEvents" />

const EventsScreen = () => {
  const { theme } = useTheme()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'home', title: i18n.t('events.tab_home') },
    { key: 'calendar', title: i18n.t('events.tab_calendar') },
    { key: 'myEvents', title: i18n.t('events.tab_mine') },
  ])
  const initialLayout = { width: Dimensions.get('window').width }

  const renderScene = SceneMap({
    home: Home,
    calendar: Calendar,
    myEvents: MyEvents,
  })
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.primaryColor }}
      style={{
        backgroundColor: Colors.defaultBackground,
      }}
      tabStyle={styles.tabStyle}
      activeColor={Colors.darkText}
      inactiveColor={Colors.darkText}
      labelStyle={{ ...Typography.subheadline }}
      getLabelText={({ route }) => route.title}
    />
  )
  return (
    <SafeAreaView style={styles.scene}>
      <Text style={styles.title}>{i18n.t('events.title')}</Text>
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
const styles = StyleSheet.create({
  scene: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  title: {
    ...Typography.title,
    margin: Spacing.margin,
  },
  tabStyle: { width: 'auto' },
})

export default EventsScreen
