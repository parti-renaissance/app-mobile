import React from 'react'
import { StyleSheet, View, Text, ViewStyle } from 'react-native'
import { FunctionComponent } from 'react'
import { unit } from '../../styles/spacing'
import { Colors, Typography } from '../../styles'
import KeyValueCell, { KeyValueCellViewModel } from './KeyValueCell'

type Props = Readonly<{
  viewModel: KeyValueListViewModel
  containerStyle: ViewStyle
}>

export interface KeyValueListViewModel {
  cells: KeyValueCellViewModel[]
  footnote: string
}

const KeyValueListView: FunctionComponent<Props> = ({
  viewModel,
  containerStyle,
}) => {
  return (
    <View style={containerStyle}>
      <View style={styles.listBackground}>
        {viewModel.cells.map((cellViewModel, index) => {
          return (
            <KeyValueCell
              key={cellViewModel.id}
              viewModel={cellViewModel}
              bottomSeparator={index === viewModel.cells.length - 1}
            />
          )
        })}
      </View>
      <Text style={styles.listFootnote}>{viewModel.footnote}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  listBackground: {
    backgroundColor: Colors.groupedListBackground,
    borderRadius: unit,
  },
  listFootnote: {
    ...Typography.footnoteLight,
    marginVertical: unit,
  },
  visitRecords: {
    flex: 1,
  },
})

export default KeyValueListView
