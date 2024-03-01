import React, { FunctionComponent } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Spacing, Typography } from '../../styles'

type Props = Readonly<{
  title: string
}>

const QuestionUserProfileSectionHeader: FunctionComponent<Props> = ({
  title,
}) => {
  return <Text style={styles.text}>{title}</Text>
}

const styles = StyleSheet.create({
  text: {
    ...Typography.headline,
    marginVertical: Spacing.margin,
  },
})

export default QuestionUserProfileSectionHeader
