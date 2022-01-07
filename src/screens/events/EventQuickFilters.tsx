import React, { FC, useState } from 'react'
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
import { EventQuickFiltersViewModelMapper } from './EventQuickFiltersViewModelMapper'
import { EventMode } from '../../core/entities/Event'

type Props = Readonly<{
  initialEventMode: EventMode | undefined
  onNewFilters: (eventMode: EventMode | undefined) => void
  onDismissModal: () => void
}>

const EventQuickFilters: FC<Props> = (props) => {
  const [eventModeFilter, setEventModeFilter] = useState<EventMode | undefined>(
    props.initialEventMode,
  )
  const [viewModel, setViewModel] = useState(
    EventQuickFiltersViewModelMapper.map(props.initialEventMode),
  )

  const clear = () => {
    setEventModeFilter(undefined)
    updateViewModel(undefined)
  }

  const submit = () => {
    props.onNewFilters(eventModeFilter)
  }

  const updateViewModel = (newEventTypeFilter: EventMode | undefined) => {
    setViewModel(EventQuickFiltersViewModelMapper.map(newEventTypeFilter))
  }

  const onInterestSelected = (code: string) => {
    if (code === EventMode.MEETING || code === EventMode.ONLINE) {
      const previousSelection = eventModeFilter
      let newSelection: EventMode | undefined
      if (previousSelection === code) {
        newSelection = undefined
      } else {
        newSelection = code
      }
      setEventModeFilter(newSelection)
      updateViewModel(newSelection)
    } else {
      // categories not implemented yet
    }
  }

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
      <View style={styles.headerContainer}>
        <CloseButton onPress={props.onDismissModal} />
        <Text style={styles.headerTitle}>{i18n.t('events.filters.title')}</Text>
        <TouchableOpacity onPress={clear}>
          <Text style={styles.headerClearFilters}>
            {i18n.t('events.filters.clear')}
          </Text>
        </TouchableOpacity>
      </View>
      <SectionGrid
        sections={viewModel.sections}
        itemDimension={100}
        renderSectionHeader={({ section: { title } }) => {
          return title !== undefined ? (
            <Text style={styles.section}>{title}</Text>
          ) : null
        }}
        renderItem={renderItem}
      />
      <View style={styles.bottomContainer}>
        <PrimaryButton
          title={i18n.t('centerofinterest.save')}
          onPress={submit}
        />
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
  headerClearFilters: {
    ...Typography.title2,
    color: Colors.primaryColor,
    marginHorizontal: Spacing.margin,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    ...Typography.title2,
    marginStart: 44,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  section: {
    ...Typography.headline,
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.unit,
  },
})

export default EventQuickFilters
