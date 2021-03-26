import React, { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import CardView from '../shared/CardView'
import { EventRowViewModel } from './EventViewModel'

type Props = Readonly<{
  viewModel: EventRowViewModel
}>

const EventView: FC<Props> = ({ viewModel }) => {
  return (
    <CardView style={styles.card} backgroundColor={Colors.defaultBackground}>
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Text
            style={[
              styles.tag,
              {
                backgroundColor: viewModel.tagBackgroundColor,
                color: viewModel.tagTextColor,
              },
            ]}
          >
            {viewModel.tag}
          </Text>
          <Text style={styles.title}>{viewModel.title}</Text>
          <Text style={styles.date}>{viewModel.date}</Text>
        </View>
        <View style={styles.rightColumn}>
          {viewModel.imageUrl ? (
            <Image source={{ uri: viewModel.imageUrl }} style={styles.image} />
          ) : (
            <View style={styles.image} />
          )}
          {viewModel.isSubscribed ? (
            <Text style={styles.subscribed}>
              <Image
                style={styles.checkIcon}
                source={require('../../assets/images/checkIcon.png')}
              />
              Inscrit
            </Text>
          ) : null}
        </View>
      </View>
    </CardView>
  )
}

const styles = StyleSheet.create({
  card: {
    marginTop: 6,
    marginHorizontal: Spacing.margin,
  },
  container: { flexDirection: 'row' },
  leftColumn: { alignItems: 'flex-start', flexGrow: 1, flexShrink: 1 },
  rightColumn: { alignItems: 'flex-end' },
  tag: {
    ...Typography.body,
    fontSize: 8,
    borderRadius: Spacing.unit,
    paddingHorizontal: Spacing.unit,
    overflow: 'hidden',
    lineHeight: 16,
    marginTop: Spacing.margin,
    marginStart: Spacing.margin,
  },
  title: {
    ...Typography.headline,
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 20,
    marginTop: Spacing.unit,
    marginStart: Spacing.margin,
  },
  date: {
    ...Typography.body,
    fontSize: 14,
    lineHeight: 19,
    marginTop: Spacing.unit,
    marginBottom: Spacing.margin,
    marginStart: Spacing.margin,
    color: Colors.lightText,
  },
  image: {
    width: 96,
    height: 57,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.margin,
    borderRadius: 8,
  },
  checkIcon: {
    tintColor: Colors.blueRibbon,
  },
  subscribed: {
    marginEnd: Spacing.margin,
    marginVertical: Spacing.margin,
    ...Typography.caption1,
    color: Colors.blueRibbon,
  },
})

export default EventView
