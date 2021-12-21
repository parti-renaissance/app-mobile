import React from 'react'
import { StyleSheet, View, Text, TextStyle, ViewStyle } from 'react-native'
import { FunctionComponent } from 'react'
import { useThemedStyles } from '../../themes'
import { unit } from '../../styles/spacing'
import { Colors, Typography } from '../../styles'
import KeyValueCell, { KeyValueCellViewModel } from './KeyValueCell'

type Props = Readonly<{
  viewModel: KeyValueListViewModel
  containerStyle: ViewStyle
  keyStyle?: TextStyle
  valueStyle?: TextStyle
}>

export interface KeyValueListViewModel {
  cells: KeyValueCellViewModel[]
  footnote: string
}

const KeyValueListView: FunctionComponent<Props> = ({
  viewModel,
  containerStyle,
  keyStyle,
  valueStyle,
}) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <View style={containerStyle}>
      <View style={styles.listBackground}>
        {viewModel.cells.map((cellViewModel, index) => {
          return (
            <KeyValueCell
              key={cellViewModel.id}
              viewModel={cellViewModel}
              bottomSeparator={index === viewModel.cells.length - 1}
              keyStyle={keyStyle}
              valueStyle={valueStyle}
            />
          )
        })}
      </View>
      <Text style={styles.listFootnote}>{viewModel.footnote}</Text>
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

const stylesFactory = () => {
  return StyleSheet.create({
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
}

export default KeyValueListView
