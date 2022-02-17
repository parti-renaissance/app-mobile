import React, { FC, useLayoutEffect } from 'react'
import { ListRenderItemInfo } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SafeAreaView from 'react-native-safe-area-view'
import { SectionGrid } from 'react-native-super-grid'
import { Colors, Spacing, Styles, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import SelectableIconLabelView, {
  SelectableIconLabelViewModel,
} from '../shared/SelectableIconLabelView'
import { PrimaryButton } from '../shared/Buttons'
import { CloseButton } from '../shared/NavigationHeaderButton'
import { useEventQuickFiltersScreen } from './useEventQuickFiltersScreen.hook'
import { EventsFilterModalNavigatorScreenProps } from '../../navigation/EventsFilterModalNavigator'

type EventQuickFiltersScreenProps = EventsFilterModalNavigatorScreenProps<'EventsFilter'>

const EventQuickFiltersScreen: FC<EventQuickFiltersScreenProps> = ({
  navigation,
  route,
}) => {
  const { eventMode } = route.params
  const {
    viewModel,
    onInterestSelected,
    onClear,
    onSubmit,
    onClose,
  } = useEventQuickFiltersScreen(eventMode)

  useLayoutEffect(() => {
    const updateNavigationHeader = () => {
      navigation.setOptions({
        title: i18n.t('events.filters.title'),
        headerLeft: () => <CloseButton onPress={onClose} />,
        headerRight: () => (
          <TouchableOpacity onPress={onClear}>
            <Text style={styles.headerClearFilters}>
              {i18n.t('events.filters.clear')}
            </Text>
          </TouchableOpacity>
        ),
      })
    }
    updateNavigationHeader()
  }, [navigation, onClear, onClose])

  const renderItem = ({
    item,
  }: ListRenderItemInfo<SelectableIconLabelViewModel>) => {
    return (
      <SelectableIconLabelView
        viewModel={item}
        onSelected={onInterestSelected}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <SectionGrid
          sections={viewModel.sections}
          itemDimension={100}
          renderSectionHeader={({ section: { title } }) => {
            return title !== undefined ? (
              <View style={styles.sectionHeaderContainer}>
                <Text style={styles.section}>{title}</Text>
              </View>
            ) : null
          }}
          renderItem={renderItem}
        />
        <View style={styles.bottomContainer}>
          <PrimaryButton
            title={i18n.t('centerofinterest.save')}
            onPress={onSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    ...Styles.topElevatedContainerStyle,
    backgroundColor: Colors.defaultBackground,
    padding: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  headerClearFilters: {
    ...Typography.callout,
    color: Colors.primaryColor,
    marginHorizontal: Spacing.margin,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  sectionHeaderContainer: {
    backgroundColor: Colors.defaultBackground,
    padding: Spacing.margin,
  },
  section: {
    ...Typography.title3,
    color: Colors.titleText,
  },
})

export default EventQuickFiltersScreen
