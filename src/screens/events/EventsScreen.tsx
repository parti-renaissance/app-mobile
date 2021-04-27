import React, { FC, useCallback, useState } from 'react'
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
import { EventScreenProps, Screen } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import { useTheme, useThemedStyles } from '../../themes'
import i18n from '../../utils/i18n'
import EventListScreen from './EventListScreen'
import { useDebounce } from 'use-debounce'
import EventQuickFilters from './EventQuickFilters'
import Theme from '../../themes/Theme'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { EventMode } from '../../core/entities/Event'
import { SafeAreaView } from 'react-native-safe-area-context'

const EventsScreen: FC<EventScreenProps> = ({ navigation }) => {
  const { theme } = useTheme()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'home', title: i18n.t('events.tab_home') },
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
  const [eventModeFilter, setEventModeFilter] = useState<EventMode | undefined>(
    undefined,
  )
  const onNewFilters = (eventMode: EventMode | undefined) => {
    setEventModeFilter(eventMode)
    setModalVisible(false)
  }
  const [searchText, setSearchText] = useState('')
  const [searchTextDebounced] = useDebounce(searchText, DEBOUNCE_TIMEOUT_MILLIS)
  const [modalVisible, setModalVisible] = useState(false)
  const dismissModal = () => {
    setModalVisible(false)
  }
  const styles = useThemedStyles(stylesFactory)
  const Home = useCallback(
    () => (
      <EventListScreen
        eventFilter="home"
        searchText={searchTextDebounced}
        eventModeFilter={eventModeFilter}
        onEventSelected={onEventSelected}
      />
    ),
    [onEventSelected, searchTextDebounced, eventModeFilter],
  )
  const Calendar = useCallback(
    () => (
      <EventListScreen
        eventFilter="calendar"
        searchText={searchTextDebounced}
        eventModeFilter={eventModeFilter}
        onEventSelected={onEventSelected}
      />
    ),
    [onEventSelected, searchTextDebounced, eventModeFilter],
  )
  const MyEvents = useCallback(
    () => (
      <EventListScreen
        eventFilter="myEvents"
        searchText={searchTextDebounced}
        eventModeFilter={eventModeFilter}
        onEventSelected={onEventSelected}
      />
    ),
    [onEventSelected, searchTextDebounced, eventModeFilter],
  )

  const renderScene = SceneMap({
    home: Home,
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
      <Modal visible={modalVisible} animationType="slide">
        <EventQuickFilters
          initialEventMode={eventModeFilter}
          onDismissModal={dismissModal}
          onNewFilters={onNewFilters}
        />
      </Modal>
      <TouchablePlatform
        style={styles.filterIconContainer}
        touchHighlight={Colors.touchHighlight}
        onPress={() => setModalVisible(true)}
      >
        <Image
          style={styles.filterIcon}
          source={require('../../assets/images/iconFilters.png')}
        />
      </TouchablePlatform>
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
const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    filterIcon: {
      margin: Spacing.margin,
      tintColor: theme.primaryColor,
    },
    filterIconContainer: {
      alignSelf: 'flex-end',
    },
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
      ...Typography.title,
      marginBottom: Spacing.margin,
      marginHorizontal: Spacing.margin,
    },
  })
}

const DEBOUNCE_TIMEOUT_MILLIS = 350

export default EventsScreen
