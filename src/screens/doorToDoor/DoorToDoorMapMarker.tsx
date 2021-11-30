import React, { memo } from 'react'
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native'
import { LatLng, Marker } from 'react-native-maps'
import { Colors } from '../../styles'
import CardView from '../shared/CardView'

type Props = {
  coordinate: LatLng
  icon: ImageSourcePropType | undefined
  onPress?: () => void
}

export const DoorToDoorMapMarker = memo((props: Props) => (
  <Marker coordinate={props.coordinate} onPress={props.onPress}>
    <CardView backgroundColor={Colors.defaultBackground}>
      <View style={styles.marker}>
        {props.icon && <Image source={props.icon} />}
      </View>
    </CardView>
  </Marker>
))

const styles = StyleSheet.create({
  marker: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
})
