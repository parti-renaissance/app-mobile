import React from 'react'
import { StyleSheet, View, Text, TextStyle } from 'react-native'
import { FunctionComponent } from 'react'
import { unit } from '../../styles/spacing'
import { Colors, Typography } from '../../styles'

type Props = Readonly<{
  viewModel: KeyValueCellViewModel
  keyStyle?: TextStyle
  valueStyle?: TextStyle
  bottomSeparator: boolean
}>

export interface KeyValueCellViewModel {
  id: string
  key: string
  value: string
}

const KeyValueCell: FunctionComponent<Props> = ({
  viewModel,
  keyStyle,
  valueStyle,
  bottomSeparator,
}) => {
  return (
    <View style={bottomSeparator ? styles.cell : styles.cellSelected}>
      <Text style={keyStyle}>{viewModel.key}</Text>
      <Text style={valueStyle}>{viewModel.value}</Text>
    </View>
  )
}

KeyValueCell.defaultProps = {
  keyStyle: {
    ...Typography.body,
    margin: unit,
  },
  valueStyle: {
    ...Typography.lightBody,
    margin: unit,
  },
}

const styles = StyleSheet.create({
  cell: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cellSelected: {
    alignSelf: 'stretch',
    borderBottomColor: Colors.separator,
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default KeyValueCell
