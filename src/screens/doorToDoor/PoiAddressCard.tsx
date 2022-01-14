import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import CardView from '../shared/CardView'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { PoiAddressCardViewModel } from './PoiAddressCardViewModel'

type Props = {
  onPress: (id: string) => void
  viewModel: PoiAddressCardViewModel | undefined
}

export const PoiAddressCard = ({ onPress, viewModel }: Props) => {
  if (!viewModel) return null

  return (
    <CardView
      style={styles.cardWrap}
      backgroundColor={Colors.defaultBackground}
    >
      <TouchablePlatform
        onPress={() => {
          onPress(viewModel.id)
        }}
        touchHighlight={Colors.touchHighlight}
      >
        <View style={styles.content}>
          <View style={styles.subcontent}>
            <View>
              <Image style={styles.building} source={viewModel.icon} />
              <Text style={styles.title}>{viewModel.formattedAddress}</Text>
            </View>
            <Text style={styles.subtitle}>{viewModel.passage}</Text>
          </View>
          <View style={styles.card}>
            <Image style={styles.image} source={viewModel.statusIcon} />
            <Text style={styles.label}>{viewModel.label}</Text>
            <Text style={styles.indicator}>{viewModel.doorsOrVotersLabel}</Text>
          </View>
        </View>
      </TouchablePlatform>
    </CardView>
  )
}

const styles = StyleSheet.create({
  building: {
    height: 14,
    marginBottom: Spacing.unit,
    width: 14,
  },
  card: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightBackground,
    borderRadius: Spacing.unit,
    justifyContent: 'center',
    marginLeft: Spacing.unit,
    paddingVertical: Spacing.small,
    width: 100,
  },
  cardWrap: {
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.unit,
  },
  content: {
    flexDirection: 'row',
    padding: Spacing.margin,
  },
  image: {
    height: 35,
    width: 35,
  },
  indicator: {
    ...Typography.headline,
    marginBottom: Spacing.small,
  },
  label: {
    ...Typography.lightCaption1,
    marginVertical: Spacing.small,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subcontent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  subtitle: {
    ...Typography.lightCaption1,
  },
  title: {
    ...Typography.title2,
  },
})
