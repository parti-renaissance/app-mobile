import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import CardView from '../shared/CardView'
import { PoiAddressCardViewModel } from './PoiAddressCardViewModel'

type Props = {
  viewModel: PoiAddressCardViewModel | undefined
}

export const PoiAddressCard = ({ viewModel }: Props) => {
  const styles = useThemedStyles(stylesFactory)

  if (!viewModel) return null

  return (
    <CardView
      style={styles.cardWrap}
      backgroundColor={Colors.defaultBackground}
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
    </CardView>
  )
}
const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    building: {
      height: 14,
      marginBottom: Spacing.unit,
      width: 14,
    },
    card: {
      alignContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.lightBackground,
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
    },
    label: {
      ...Typography.lightCallout,
      marginVertical: Spacing.unit,
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    subcontent: {
      flex: 1,
      justifyContent: 'space-between',
    },
    subtitle: {
      ...Typography.lightCallout,
    },
    title: {
      ...Typography.title2,
    },
  })
}
