import React, { FC } from 'react'
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import CardView from '../shared/CardView'
import { HorizontalSeparator } from '../shared/HorizontalSeparator'
import { HorizontalSpacer, VerticalSpacer } from '../shared/Spacer'
import TagView from '../shared/TagView'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { EventRowViewModel } from './EventViewModel'

type Props = Readonly<{
  viewModel: EventRowViewModel
  style?: StyleProp<ViewStyle>
  onEventSelected: (eventId: string) => void
}>

const EventView: FC<Props> = ({ viewModel, style, onEventSelected }) => {
  return (
    <CardView style={style} backgroundColor={Colors.defaultBackground}>
      <TouchablePlatform touchHighlight={Colors.touchHighlight} onPress={() => onEventSelected(viewModel.id)}>
        <View style={styles.container}>
          <View style={styles.topRow}>
            <View style={styles.leftColumn}>
              <TagView>{viewModel.tag}</TagView>
              <Text style={styles.title}>{viewModel.title}</Text>
            </View>
            <View style={styles.rightColumn}>{viewModel.imageUrl ? <Image source={{ uri: viewModel.imageUrl }} style={styles.image} /> : null}</View>
          </View>
        </View>
      </TouchablePlatform>
    </CardView>
  )
}

const styles = StyleSheet.create({
  address: {
    ...Typography.body,
    color: Colors.darkText,
    flexShrink: 1,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressIcon: {
    width: 24,
    height: 24,
  },
  bottomRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    marginTop: Spacing.unit,
  },
  checkIcon: {
    tintColor: Colors.primaryColor,
  },
  container: {
    flexDirection: 'column',
    margin: Spacing.margin,
  },
  day: {
    ...Typography.body,
    color: Colors.darkText,
  },
  hour: {
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
    ...Typography.headline,
    marginTop: Spacing.unit,
  },
  topRow: {
    flexDirection: 'row',
  },
})

export default EventView
