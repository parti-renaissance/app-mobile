import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import CardView from '../shared/CardView'
import { RetaliationCardViewModel } from './RetaliationCardViewModel'

type Props = Readonly<{
  viewModel: RetaliationCardViewModel
}>

const RetaliationCard: FunctionComponent<Props> = ({ viewModel }) => {
  return (
    <CardView
      style={styles.cardView}
      backgroundColor={Colors.defaultBackground}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={viewModel.socialIcon} />
          <Text style={styles.title}>{viewModel.title}</Text>
        </View>
        <Text style={styles.body}>{viewModel.body}</Text>
        {viewModel.image.length !== 0 ? (
          <Image style={styles.image} source={{ uri: viewModel.image }} />
        ) : null}
      </View>
    </CardView>
  )
}

const styles = StyleSheet.create({
  body: {
    ...Typography.body,
    marginBottom: Spacing.margin,
  },
  cardView: {
    marginVertical: Spacing.margin,
  },
  container: {
    padding: Spacing.margin,
  },
  image: {
    aspectRatio: 258 / 145,
    resizeMode: 'cover',
    width: '100%',
  },
  title: {
    ...Typography.title2,
    marginLeft: Spacing.unit,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.margin,
  },
})

export default RetaliationCard
