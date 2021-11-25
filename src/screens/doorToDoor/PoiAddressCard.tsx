import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { DoorToDoorAddress } from '../../core/entities/DoorToDoor'
import { Colors, Spacing, Typography } from '../../styles'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import CardView from '../shared/CardView'

type Props = {
  poi: DoorToDoorAddress
}

export const PoiAddressCard = ({ poi }: Props) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <CardView
      style={styles.cardWrap}
      backgroundColor={Colors.defaultBackground}
    >
      <View style={styles.content}>
        <View style={styles.subcontent}>
          <View>
            <Image
              style={styles.building}
              source={require('../../assets/images/papHomeIcon.png')}
            />
            <Text style={styles.title}>{poi.formattedAddress}</Text>
          </View>
          <Text style={styles.subtitle}>Aucun passage</Text>
        </View>
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={require('../../assets/images/papDoneIcon.png')}
          />
          <Text style={styles.text}>PORTES FRAPPÉES</Text>
          <Text style={styles.indicator}>10</Text>
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
    subcontent: {
      flex: 1,
      justifyContent: 'space-between',
    },
    subtitle: {
      ...Typography.lightCallout,
    },
    text: {
      ...Typography.lightCallout,
      marginVertical: Spacing.unit,
      textAlign: 'center',
    },
    title: {
      ...Typography.title2,
    },
  })
}
