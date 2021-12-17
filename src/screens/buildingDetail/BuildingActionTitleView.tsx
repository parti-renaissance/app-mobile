import React, { FunctionComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Typography } from '../../styles'
import { margin } from '../../styles/spacing'
import { useThemedStyles } from '../../themes'

export interface BuildingActionTitleViewModel {
  title: string
  subtitle: string
}

type ActionTitleProps = Readonly<{
  viewModel: BuildingActionTitleViewModel
}>

const BuildingActionTitleView: FunctionComponent<ActionTitleProps> = ({
  viewModel,
}) => {
  const styles = useThemedStyles(stylesFactory)

  if (viewModel.subtitle.length !== 0) {
    return (
      <View style={styles.actionContainer}>
        <Text style={styles.actionText}>{viewModel.title}</Text>
        <Text style={styles.actionSubtitle}>{viewModel.subtitle}</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.actionContainer}>
        <Text style={styles.actionText}>{viewModel.title}</Text>
      </View>
    )
  }
}

const stylesFactory = () => {
  return StyleSheet.create({
    actionContainer: {
      flex: 1,
      flexWrap: 'nowrap',
      margin: margin,
    },
    actionSubtitle: {
      ...Typography.lightCaption1,
    },
    actionText: {
      ...Typography.callout,
    },
  })
}

export default BuildingActionTitleView
