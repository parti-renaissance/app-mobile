import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { AddressType } from '../../core/entities/DoorToDoor'
import { Colors, Spacing, Typography } from '../../styles'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import CardView from '../shared/CardView'

type Props = {
  poi: AddressType
}

export const PoiAddressCard = ({ poi }: Props) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <CardView backgroundColor={Colors.defaultBackground}>
      <View style={styles.content}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <Image
              style={styles.building}
              source={require('../../assets/images/papHomeIcon.png')} // papBuildingIcon
            />
            <Text style={styles.title}>
              {poi.number} {poi.address}
            </Text>
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
    content: {
      padding: Spacing.margin,
      flexDirection: 'row',
    },
    title: {
      ...Typography.title2,
    },
    subtitle: {
      ...Typography.lightCallout,
    },
    building: {
      height: 14,
      marginBottom: Spacing.unit,
      width: 14,
    },
    image: {
      height: 35,
      width: 35,
    },
    text: {
      ...Typography.lightCallout,
      marginVertical: Spacing.unit,
      textAlign: 'center',
    },
    indicator: {
      ...Typography.headline,
    },
  })
}
