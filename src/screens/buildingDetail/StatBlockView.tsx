import React, { FunctionComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Typography } from '../../styles'
import { small } from '../../styles/spacing'
import { useThemedStyles } from '../../themes'
import { StatBlockViewModel } from './StatBlockViewModel'

type Props = Readonly<{
  viewModel: StatBlockViewModel
}>

const StatBlockView: FunctionComponent<Props> = ({ viewModel }) => {
  const styles = useThemedStyles(stylesFactory)
  return (
    <View style={styles.statBlockView}>
      <Text>{viewModel.stat} </Text>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{viewModel.title} </Text>
      </View>
    </View>
  )
}

const stylesFactory = () => {
  return StyleSheet.create({
    stat: {
      ...Typography.headline,
      textAlign: 'center',
    },
    statBlockView: {
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: small,
    },
    title: {
      ...Typography.footnote,
      textAlign: 'center',
    },
    titleContainer: {
      flex: 1,
      justifyContent: 'center',
    },
  })
}

export default StatBlockView
