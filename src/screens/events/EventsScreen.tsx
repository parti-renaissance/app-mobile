import React, { FC, useCallback, useLayoutEffect, useState } from 'react'
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { EventScreenProps } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import EventListScreen from './EventListScreen'
import EventQuickFilters from './EventQuickFilters'
import SafeAreaView from 'react-native-safe-area-view'
import { Analytics } from '../../utils/Analytics'
import { useEventsScreen } from './useEventsScreen.hook'
import { EventsFilterButton } from '../shared/NavigationHeaderButton'

const ROUTES = [
  { key: 'home', title: i18n.t('events.tab_home') },
  { key: 'calendar', title: i18n.t('events.tab_calendar') },
  { key: 'myEvents', title: i18n.t('events.tab_mine') },
]

const EventsScreen: FC<EventScreenProps> = ({ navigation }) => {
  const initialLayout = { width: Dimensions.get('window').width }
  const [index, setIndex] = useState(0)

  const {
    searchText,
    eventModeFilter,
    modalVisible,
    onEventSelected,
    onNewFilters,
    onChangeText,
    onFiltersSelected,
    dismissModal,
  } = useEventsScreen()

  useLayoutEffect(() => {
    const updateNavigationHeader = () => {
      navigation.setOptions({
        headerRight: () => <EventsFilterButton onPress={onFiltersSelected} />,
      })
    }
    updateNavigationHeader()
  }, [navigation, onFiltersSelected])

  const Home = useCallback(
    () => (
      <EventListScreen
        eventFilter="home"
        searchText={searchText}
        eventModeFilter={eventModeFilter}
        onEventSelected={onEventSelected}
      />
    ),
    [onEventSelected, searchText, eventModeFilter],
  )
  const Calendar = useCallback(
    () => (
      <EventListScreen
        eventFilter="calendar"
        searchText={searchText}
        eventModeFilter={eventModeFilter}
        onEventSelected={onEventSelected}
      />
    ),
    [onEventSelected, searchText, eventModeFilter],
  )
  const MyEvents = useCallback(
    () => (
      <EventListScreen
        eventFilter="myEvents"
        searchText={searchText}
        eventModeFilter={eventModeFilter}
        onEventSelected={onEventSelected}
      />
    ),
    [onEventSelected, searchText, eventModeFilter],
  )

  const renderScene = SceneMap({
    home: Home,
    calendar: Calendar,
    myEvents: MyEvents,
  })
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.accent }}
      style={{
        backgroundColor: Colors.defaultBackground,
      }}
      tabStyle={styles.tabStyle}
      activeColor={Colors.darkText}
      inactiveColor={Colors.darkText}
      labelStyle={{ ...Typography.subheadline }}
      getLabelText={({ route }) => route.title}
      onTabPress={async (scene) => {
        await Analytics.logEventTabSelected(scene.route.key)
      }}
    />
  )

  return (
    <SafeAreaView style={styles.scene}>
      <Modal visible={modalVisible} animationType="slide">
        <EventQuickFilters
          initialEventMode={eventModeFilter}
          onDismissModal={dismissModal}
          onNewFilters={onNewFilters}
        />
      </Modal>
      <Text style={styles.title}>{i18n.t('events.title')}</Text>
      <View style={styles.searchContainer}>
        <Image source={require('../../assets/images/iconSearch.png')} />
        <TextInput
          style={styles.search}
          onChangeText={onChangeText}
          placeholder={i18n.t('events.search_placeholder')}
        />
      </View>
      {/* @ts-ignore https://github.com/satya164/react-native-tab-view/issues/1159 */}
      <TabView
        navigationState={{ index, routes: ROUTES }}
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
    ...Typography.inputText,
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
    ...Typography.largeTitle,
    marginBottom: Spacing.margin,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.largeMargin,
  },
})

export default EventsScreen
