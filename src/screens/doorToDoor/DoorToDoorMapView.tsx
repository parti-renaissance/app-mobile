import React, { useState } from 'react'
import { Dimensions, Pressable, StyleSheet } from 'react-native'
import MapView from 'react-native-map-clustering'
import { LatLng } from 'react-native-maps'
import { AddressType } from '../../core/entities/DoorToDoor'
import { Spacing } from '../../styles'
import { CampaignCard } from './CampaignCard'
import { CustomCluster } from './CustomCluster'
import { CustomMarker } from './CustomMarker'
import { PoiAddressCard } from './PoiAddressCard'

type Props = {
  data: AddressType[]
  location: LatLng
}

type PopupProps = {
  visible: boolean
  value?: AddressType
}

const DoorToDoorMapView = ({ data, location }: Props) => {
  const [popup, setPopup] = useState<PopupProps>({
    visible: false,
    value: undefined,
  })

  const initialPosition = {
    latitude: location.latitude,
    longitude: location.longitude,
  }

  const initialRegion = {
    ...initialPosition,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }

  const initialCamera = {
    zoom: 12,
    pitch: 0,
    heading: 0,
    altitude: 2000,
    center: initialPosition,
  }

  const onMarkerPress = (poi: AddressType) => {
    setPopup({
      visible: true,
      value: poi,
    })
  }

  const renderPopup = () => (
    <Pressable
      style={styles.popupWrap}
      onPress={() => setPopup({ visible: false })}
    >
      <Pressable style={styles.popup}>
        <PoiAddressCard poi={popup.value!} />
        <CampaignCard />
      </Pressable>
    </Pressable>
  )

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        initialCamera={initialCamera}
        initialRegion={initialRegion}
        renderCluster={(cluster) => (
          <CustomCluster key={cluster.id} {...cluster} />
        )}
      >
        {data.map((marker) => (
          <CustomMarker
            key={marker.uuid}
            coordinate={marker}
            onPress={() => onMarkerPress(marker)}
          />
        ))}
      </MapView>
      {popup.visible && renderPopup()}
    </>
  )
}

const styles = StyleSheet.create({
  popup: {
    marginBottom: Spacing.unit,
    width: Dimensions.get('window').width,
  },
  popupWrap: {
    alignItems: 'center',
    bottom: 0,
    height: '100%',
    justifyContent: 'flex-end',
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
})

export default DoorToDoorMapView
