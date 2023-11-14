import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Spacing, Typography } from '../../styles'
import { VerticalSpacer } from '../shared/Spacer'

type Props = Readonly<{
  title: string
}>

export const PhonePollDetailSuccessSectionHeader: FunctionComponent<Props> = ({
  title,
}) => {
  return (
    <View style={styles.content}>
      <VerticalSpacer spacing={Spacing.largeMargin} />
      <Text style={styles.title}>{title}</Text>
      <VerticalSpacer spacing={Spacing.margin} />
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.margin,
  },
  title: {
    ...Typography.title,
  },
})
