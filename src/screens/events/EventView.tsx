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
          <View style={styles.topRow}>
            <View style={styles.leftColumn}>
              <TagView style={styles.tag} viewModel={viewModel.tag} />
              <Text style={styles.title}>{viewModel.title}</Text>
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
            </View>
          </View>
          <View style={styles.bottomRow}>
            <View style={styles.leftColumn}>
              <Text style={styles.date}>{viewModel.date}</Text>
            </View>
            <View style={styles.rightColumn}>
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
        </View>
      </TouchablePlatform>
    </CardView>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    bottomRow: {
      alignItems: 'baseline',
      flexDirection: 'row',
      marginTop: Spacing.unit,
    },
    card: {
      marginHorizontal: Spacing.margin,
      marginVertical: Spacing.unit,
    },
    checkIcon: {
      tintColor: theme.primaryColor,
    },
    container: {
      flexDirection: 'column',
      margin: Spacing.margin,
    },
    date: {
      ...Typography.body,
      color: Colors.lightText,
    },
    image: {
      borderRadius: 8,
      height: 57,
      marginLeft: Spacing.margin,
      width: 96,
    },
    leftColumn: {
      alignItems: 'flex-start',
      flexGrow: 1,
      flexShrink: 1,
    },
    rightColumn: {
      alignItems: 'flex-end',
    },
    subscribed: {
      ...Typography.caption1,
      color: theme.primaryColor,
    },
    tag: {
      marginStart: 0,
      marginTop: 0,
      textTransform: 'uppercase',
    },
    title: {
      ...Typography.eventItemTitle,
      marginTop: Spacing.unit,
    },
    topRow: {
      flexDirection: 'row',
    },
  })
}

export default EventView
