import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Pressable, StyleSheet } from 'react-native'
import MapView from 'react-native-map-clustering'
import { LatLng, Marker } from 'react-native-maps'
import { DoorToDoorAddress } from '../../core/entities/DoorToDoor'
import { Spacing } from '../../styles'
import { DoorToDoorCampaignCard } from './DoorToDoorCampaignCard'
import { DoorToDoorCampaignCardViewModelMapper } from './DoorToDoorCampaignCardViewModelMapper'
import { DoorToDoorMapCluster } from './DoorToDoorMapCluster'
import {
  DoorToDoorMapMarker,
  MARKER_DEFAULT_ANCHOR,
} from './DoorToDoorMapMarker'
import { PoiAddressCard } from './PoiAddressCard'
import { PoiAddressCardViewModelMapper } from './PoiAddressCardViewModelMapper'
import Geolocation from 'react-native-geolocation-service'

type Props = {
  data: DoorToDoorAddress[]
  location: LatLng
  onAddressPress: (id: string) => void
}

type PopupProps = {
  visible: boolean
  value?: DoorToDoorAddress
}

const DoorToDoorMapView = ({ data, location, onAddressPress }: Props) => {
  const [currentPosition, setCurrentPosition] = useState<LatLng>(location)
  const [popup, setPopup] = useState<PopupProps>({
    visible: false,
    value: undefined,
  })
  const markerExtraProps = { cluster: false }

  const initialPosition = {
    latitude: location.latitude,
    longitude: location.longitude,
  }

  const initialRegion = {
    ...initialPosition,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }

  useEffect(() => {
    const watchID = Geolocation.watchPosition((position) => {
      setCurrentPosition({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      })
    })

    return () => {
      watchID != null && Geolocation.clearWatch(watchID)
    }
  }, [])

  const onMarkerPress = (poi: DoorToDoorAddress) => {
    setPopup({
      visible: true,
      value: poi,
    })
  }

  const Popup = () => (
    <Pressable
      style={styles.popupWrap}
      onPress={() => setPopup({ visible: false })}
    >
      <Pressable style={styles.popup}>
        <PoiAddressCard
          onPress={onAddressPress}
          viewModel={PoiAddressCardViewModelMapper.map('map', popup.value)}
        />
        <DoorToDoorCampaignCard
          viewModel={DoorToDoorCampaignCardViewModelMapper.map()}
        />
      </Pressable>
    </Pressable>
  )

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        rotateEnabled={false}
        showsPointsOfInterest={true}
        showsCompass={false}
        showsBuildings={true}
        showsIndoors={false}
        pitchEnabled={false}
        loadingEnabled={true}
        maxZoomLevel={20}
        minZoomLevel={10}
        renderCluster={(cluster) => (
          <DoorToDoorMapCluster key={cluster.id} {...cluster} />
        )}
        // Android only
        toolbarEnabled={false}
        // iOS only
        showsScale={true}
        // Clustering
        minPoints={3}
        nodeSize={8} // performance optimization
      >
        <Marker
          coordinate={currentPosition}
          tracksViewChanges={false}
          {...markerExtraProps}
          anchor={MARKER_DEFAULT_ANCHOR}
        >
          <Image source={require('../../assets/images/papPositionIcon.png')} />
        </Marker>
        {data.map((marker) => (
          <DoorToDoorMapMarker
            key={marker.id}
            icon={PoiAddressCardViewModelMapper.map('map', marker)?.statusIcon}
            coordinate={{
              longitude: marker.longitude,
              latitude: marker.latitude,
            }}
            onPress={() => onMarkerPress(marker)}
          />
        ))}
      </MapView>
      {popup.visible && <Popup />}
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
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
