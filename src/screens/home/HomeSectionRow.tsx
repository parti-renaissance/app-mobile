import React, { FunctionComponent } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Spacing, Typography } from '../../styles'
import { HomeSectionRowViewModel } from './HomeRowViewModel'

type Props = Readonly<{
  viewModel: HomeSectionRowViewModel
}>

const HomeSectionRow: FunctionComponent<Props> = ({ viewModel }) => {
  if (viewModel.sectionName) {
    return <Text style={styles.content}>{viewModel.sectionName}</Text>
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  content: {
    ...Typography.headline,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.margin,
  },
})

export default HomeSectionRow
