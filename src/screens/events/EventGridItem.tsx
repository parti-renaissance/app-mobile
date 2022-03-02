import React, { FC } from 'react'
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import CardView from '../shared/CardView'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { EventRowViewModel } from './EventViewModel'
import TagView from '../shared/TagView'
import i18n from '../../utils/i18n'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  viewModel: EventRowViewModel
  onEventSelected: (eventId: string) => void
}>

const EventGridItem: FC<Props> = ({ viewModel, style, onEventSelected }) => {
  return (
    <CardView
      style={[styles.card, style]}
      backgroundColor={Colors.defaultBackground}
    >
      <TouchablePlatform
        touchHighlight={Colors.touchHighlight}
        onPress={() => onEventSelected(viewModel.id)}
      >
        <View style={styles.container}>
          {viewModel.imageUrl ? (
            <Image source={{ uri: viewModel.imageUrl }} style={styles.image} />
          ) : (
            <View style={[styles.image, styles.imagePlaceholder]} />
          )}
          <View style={styles.leftColumn}>
            <TagView style={styles.tag}>{viewModel.tag}</TagView>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
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
            <View style={styles.footer}>
              <View style={styles.dateContainer}>
                <Text style={styles.day} numberOfLines={1}>
                  {viewModel.day}
                </Text>
                <Text style={styles.hour} numberOfLines={1}>
                  {viewModel.hour}
                </Text>
              </View>
              {viewModel.isSubscribed ? (
                <Text style={styles.subscribed}>
                  <Image
                    style={styles.checkIcon}
                    source={require('../../assets/images/checkIcon.png')}
                  />
                  {'\n'}
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
  card: {
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.unit,
    width: 170,
  },
  checkIcon: {
    tintColor: Colors.primaryColor,
  },
  container: {
    flexDirection: 'column',
    minHeight: 212,
  },
  dateContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  day: {
    ...Typography.body,
    color: Colors.darkText,
  },
  hour: {
    ...Typography.body,
    color: Colors.lightText,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
    padding: Spacing.unit,
  },
  image: {
    height: 86,
  },
  imagePlaceholder: {
    backgroundColor: Colors.groupedListBackground,
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
  tag: {
    marginStart: Spacing.unit,
    marginTop: Spacing.unit,
  },
  title: {
    ...Typography.headline,
    color: Colors.darkText,
    marginHorizontal: Spacing.unit,
    marginTop: Spacing.unit,
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

export default EventGridItem
