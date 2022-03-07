import React, { FC, useLayoutEffect } from 'react'
import { ListRenderItemInfo, FlatList, StyleSheet } from 'react-native'
import { Colors, Spacing } from '../../styles'
import { useListPickerScreen } from './useListPickerScreen.hook'
import { ListPickerModalNavigatorScreenProps } from '../../navigation/listPickerModal/ListPickerModalNavigatorScreenProps'
import { CloseButton } from '../shared/NavigationHeaderButton'
import { ListPickerRow, ListPickerRowViewModel } from './ListPickerRow'
import SafeAreaView from 'react-native-safe-area-view'
import { HorizontalSeparator } from '../shared/HorizontalSeparator'
import { SearchBar } from './SearchBar'

type ListPickerScreenProps = ListPickerModalNavigatorScreenProps<'ListPicker'>

export const ListPickerScreen: FC<ListPickerScreenProps> = ({
  route,
  navigation,
}) => {
  const {
    title,
    items,
    selectedItemId,
    onItemSelected,
    displaySearch,
    presentationType,
  } = route.params

  useLayoutEffect(() => {
    const updateNavigationHeader = () => {
      navigation.setOptions({
        headerLeft:
          presentationType === 'modal'
            ? () => <CloseButton onPress={() => navigation.goBack()} />
            : undefined,
        title,
      })
    }
    updateNavigationHeader()
  }, [navigation, presentationType, title])

  const { displayedItems, onSelectItem, onChangeText } = useListPickerScreen(
    items,
    onItemSelected,
  )

  const data: ListPickerRowViewModel[] = displayedItems.map((item) => {
    return {
      id: item.id,
      title: item.value,
      isSelected: item.id === selectedItemId,
    }
  })

  const renderItem = (info: ListRenderItemInfo<ListPickerRowViewModel>) => {
    return (
      <ListPickerRow
        viewModel={info.item}
        onPress={() => onSelectItem(info.item.id)}
      />
    )
  }

  return (
    <SafeAreaView style={styles.root}>
      {(displaySearch ?? false) && <SearchBar onChangeText={onChangeText} />}
      <FlatList
        style={styles.scrollView}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <HorizontalSeparator leadingInset={Spacing.margin} />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
  },
  scrollView: {
    backgroundColor: Colors.defaultBackground,
  },
})
