import React, { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import CardView from '../shared/CardView'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { EventRowViewModel } from './EventViewModel'
import TagView from './TagView'

type Props = Readonly<{
  viewModel: EventRowViewModel
  onEventSelected: (eventId: string) => void
}>

const EventView: FC<Props> = ({ viewModel, onEventSelected }) => {
  const styles = useThemedStyles(stylesFactory)
  return (
    <CardView style={styles.card} backgroundColor={Colors.defaultBackground}>
      <TouchablePlatform
        touchHighlight={Colors.touchHighlight}
        onPress={() => onEventSelected(viewModel.id)}
      >
        <View style={styles.container}>
          <View style={styles.leftColumn}>
            <TagView style={styles.tag} viewModel={viewModel.tag} />
            <Text style={styles.title}>{viewModel.title}</Text>
            <Text style={styles.date}>{viewModel.date}</Text>
          </View>
          <View style={styles.rightColumn}>
            {viewModel.imageUrl ? (
              <Image
                source={{ uri: viewModel.imageUrl }}
                style={styles.image}
              />
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
      </TouchablePlatform>
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
      marginStart: Spacing.margin,
      marginTop: Spacing.margin,
    },
    title: {
      ...Typography.eventItemTitle,
      marginStart: Spacing.margin,
      marginTop: Spacing.unit,
    },
  })
}

export default EventView
