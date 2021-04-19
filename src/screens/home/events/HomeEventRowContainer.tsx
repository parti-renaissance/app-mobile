import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../../styles'
import CardView from '../../shared/CardView'

type Props = Readonly<{}>

export const HomeEventRowContainer: FunctionComponent<Props> = ({}) => {
  return (
    <CardView
      style={styles.cardView}
      backgroundColor={Colors.defaultBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>HELLO</Text>
      </View>
    </CardView>
  )
}

const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.margin,
  },
  container: {
    padding: Spacing.margin,
  },
  title: {
    ...Typography.subheadline,
    lineHeight: 20,
    marginBottom: Spacing.margin,
  },
})
