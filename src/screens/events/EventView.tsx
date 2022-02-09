import React, { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import CardView from '../shared/CardView'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { EventRowViewModel } from './EventViewModel'
import TagView from './TagView'

type Props = Readonly<{
  viewModel: EventRowViewModel
  onEventSelected: (event: EventRowViewModel) => void
}>

const EventView: FC<Props> = ({ viewModel, onEventSelected }) => {
  return (
    <CardView style={styles.card} backgroundColor={Colors.defaultBackground}>
      <TouchablePlatform
        touchHighlight={Colors.touchHighlight}
        onPress={() => onEventSelected(viewModel)}
      >
        <View style={styles.container}>
          <View style={styles.topRow}>
            <View style={styles.leftColumn}>
              <TagView viewModel={viewModel.tag} />
              <Text style={styles.title}>
                {viewModel.isOnline ? (
                  <View style={styles.webcamIconContainer}>
                    <Image
                      style={styles.webcamIcon}
                      source={require('../../assets/images/videocam.png')}
                    />
                  </View>
                ) : null}
                {viewModel.title}
              </Text>
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
                  {i18n.t('events.subscribed')}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      </TouchablePlatform>
    </CardView>
  )
}

const styles = StyleSheet.create({
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
    tintColor: Colors.primaryColor,
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
    color: Colors.primaryColor,
  },
  title: {
    ...Typography.eventItemTitle,
    marginTop: Spacing.unit,
  },
  topRow: {
    flexDirection: 'row',
  },
  webcamIcon: {
    borderRadius: 2,
    height: 16,
    resizeMode: 'contain',
    width: 24,
  },
  webcamIconContainer: {
    paddingRight: Spacing.unit,
  },
})

export default EventView
