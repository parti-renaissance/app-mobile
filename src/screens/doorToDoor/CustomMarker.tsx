import React, { memo } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { LatLng, MapEvent, Marker } from 'react-native-maps'
import { Colors } from '../../styles'
import CardView from '../shared/CardView'

type Props = {
  coordinate: LatLng
  onPress?: (event: MapEvent<{ action: 'marker-press'; id: string }>) => void
}

export const CustomMarker = memo((props: Props) => (
  <Marker coordinate={props.coordinate} onPress={props.onPress}>
    <CardView backgroundColor={Colors.defaultBackground}>
      <View style={styles.marker}>
        <Image source={require('../../assets/images/papToFinishIcon.png')} />
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
