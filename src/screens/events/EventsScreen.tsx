import React, { FC } from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { EventScreenProps, Screen } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'
import i18n from '../../utils/i18n'
import EventListScreen from './EventListScreen'

const EventsScreen: FC<EventScreenProps> = ({ navigation }) => {
  const { theme } = useTheme()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'calendar', title: i18n.t('events.tab_calendar') },
    { key: 'myEvents', title: i18n.t('events.tab_mine') },
  ])
  const initialLayout = { width: Dimensions.get('window').width }
  const onEventSelected = (eventId: string) => {
    navigation.navigate(Screen.eventDetails, {
      eventId: eventId,
    })
  }

  const Calendar = () => (
    <EventListScreen eventFilter="calendar" onEventSelected={onEventSelected} />
  )
  const MyEvents = () => (
    <EventListScreen eventFilter="myEvents" onEventSelected={onEventSelected} />
  )

  const renderScene = SceneMap({
    calendar: Calendar,
    myEvents: MyEvents,
  })
  const renderTabBar = (props: any) => (
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
const styles = StyleSheet.create({
  scene: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  tabStyle: { width: 'auto' },
  title: {
    ...Typography.title,
    margin: Spacing.margin,
  },
})

export default EventsScreen
