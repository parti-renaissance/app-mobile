import React, { FC } from 'react'
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
import { EventMode } from '../../core/entities/Event'
import { useEventQuickFilters } from './useEventQuickFilters.hook'

type Props = Readonly<{
  initialEventMode: EventMode | undefined
  onNewFilters: (eventMode: EventMode | undefined) => void
  onDismissModal: () => void
}>

const EventQuickFilters: FC<Props> = (props) => {
  const {
    viewModel,
    onInterestSelected,
    onClear,
    onSubmit,
  } = useEventQuickFilters(props.initialEventMode, props.onNewFilters)

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
        <TouchableOpacity onPress={onClear}>
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
          onPress={onSubmit}
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
