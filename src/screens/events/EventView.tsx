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
    marginHorizontal: Spacing.margin,
    marginTop: 6,
  },
  checkIcon: {
    tintColor: Colors.blueRibbon,
  },
  container: { flexDirection: 'row' },
  date: {
    ...Typography.body,
    color: Colors.lightText,
    fontSize: 14,
    lineHeight: 19,
    marginBottom: Spacing.margin,
    marginStart: Spacing.margin,
    marginTop: Spacing.unit,
  },
  image: {
    borderRadius: 8,
    height: 57,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.margin,
    width: 96,
  },
  leftColumn: { alignItems: 'flex-start', flexGrow: 1, flexShrink: 1 },
  rightColumn: { alignItems: 'flex-end' },
  subscribed: {
    marginEnd: Spacing.margin,
    marginVertical: Spacing.margin,
    ...Typography.caption1,
    color: Colors.blueRibbon,
  },
  tag: {
    ...Typography.body,
    borderRadius: Spacing.unit,
    fontSize: 8,
    lineHeight: 16,
    marginStart: Spacing.margin,
    marginTop: Spacing.margin,
    overflow: 'hidden',
    paddingHorizontal: Spacing.unit,
  },
  title: {
    ...Typography.headline,
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 20,
    marginStart: Spacing.margin,
    marginTop: Spacing.unit,
  },
})

export default EventView
