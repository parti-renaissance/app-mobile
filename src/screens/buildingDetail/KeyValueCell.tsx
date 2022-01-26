import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FunctionComponent } from 'react'
import { unit } from '../../styles/spacing'
import { Colors, Typography } from '../../styles'

type Props = Readonly<{
  viewModel: KeyValueCellViewModel
  bottomSeparator: boolean
}>

export interface KeyValueCellViewModel {
  id: string
  key: string
  value: string
}

const KeyValueCell: FunctionComponent<Props> = ({
  viewModel,
  bottomSeparator,
}) => {
  return (
    <View style={bottomSeparator ? styles.cell : styles.cellSelected}>
      <Text style={styles.keyStyle}>{viewModel.key}</Text>
      <Text style={styles.valueStyle} ellipsizeMode="tail" numberOfLines={1}>
        {viewModel.value}
      </Text>
    </View>
  )
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
  keyStyle: {
    ...Typography.body,
    margin: unit,
  },
  valueStyle: {
    ...Typography.lightBody,
    flex: 1,
    margin: unit,
    textAlign: 'right',
  },
})

export default KeyValueCell
