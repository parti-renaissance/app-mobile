import React, { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import CardView from '../shared/CardView'
import { EventRowViewModel } from './EventViewModel'

type Props = Readonly<{
  viewModel: EventRowViewModel
}>

const EventView: FC<Props> = ({ viewModel }) => {
  const styles = useThemedStyles(stylesFactory)
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

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    card: {
      marginHorizontal: Spacing.margin,
      marginVertical: Spacing.unit,
    },
    checkIcon: {
      tintColor: theme.primaryColor,
    },
    container: { flexDirection: 'row' },
    date: {
      ...Typography.body,
      color: Colors.lightText,
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
      color: theme.primaryColor,
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
      ...Typography.eventItemTitle,
      marginStart: Spacing.margin,
      marginTop: Spacing.unit,
    },
  })
}

export default EventView
