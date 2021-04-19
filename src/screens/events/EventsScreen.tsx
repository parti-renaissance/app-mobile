import React, { FC, useCallback, useState } from 'react'
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { EventScreenProps, Screen } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'
import i18n from '../../utils/i18n'
import EventListScreen from './EventListScreen'
import { useDebounce } from 'use-debounce'

const EventsScreen: FC<EventScreenProps> = ({ navigation }) => {
  const { theme } = useTheme()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'calendar', title: i18n.t('events.tab_calendar') },
    { key: 'myEvents', title: i18n.t('events.tab_mine') },
  ])
  const initialLayout = { width: Dimensions.get('window').width }
  const onEventSelected = useCallback(
    (eventId: string) => {
      navigation.navigate(Screen.eventDetails, {
        eventId: eventId,
      })
    },
    [navigation],
  )
  const [searchText, setSearchText] = useState('')
  const [searchTextDebounced] = useDebounce(searchText, DEBOUNCE_TIMEOUT_MILLIS)

  const Calendar = useCallback(
    () => (
      <EventListScreen
        eventFilter="calendar"
        searchText={searchTextDebounced}
        onEventSelected={onEventSelected}
      />
    ),
    [onEventSelected, searchTextDebounced],
  )
  const MyEvents = useCallback(
    () => (
      <EventListScreen
        eventFilter="myEvents"
        searchText={searchTextDebounced}
        onEventSelected={onEventSelected}
      />
    ),
    [onEventSelected, searchTextDebounced],
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
      <View style={styles.searchContainer}>
        <Image source={require('../../assets/images/iconSearch.png')} />
        <TextInput
          style={styles.search}
          onChangeText={setSearchText}
          placeholder={i18n.t('events.search_placeholder')}
        />
      </View>
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
  search: {
    ...Typography.body,
    flex: 1,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.unit,
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: Colors.groupedListBackground,
    borderRadius: 8,
    flexDirection: 'row',
    marginHorizontal: Spacing.margin,
    paddingHorizontal: Spacing.small,
  },
  tabStyle: { width: 'auto' },
  title: {
    ...Typography.title,
    margin: Spacing.margin,
  },
})

const DEBOUNCE_TIMEOUT_MILLIS = 350

export default EventsScreen
