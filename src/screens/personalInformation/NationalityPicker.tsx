import React, { FC } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { Colors, Typography } from '../../styles'

type Props = Readonly<{
  onPress: () => void
  country: string
}>

export const NationalityPicker: FC<Props> = ({ country, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Text suppressHighlighting={true} style={styles.text}>
        {country}
      </Text>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'right',
    ...Typography.body,
    color: Colors.darkText,
  },
})
