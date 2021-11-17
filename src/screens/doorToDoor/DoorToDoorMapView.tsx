import React from 'react'
import MapView from 'react-native-map-clustering'

const DoorToDoorMapView = () => {
  const initialPosition = { latitude: 45.764, longitude: 4.8357 }

  const initialRegion = {
    ...initialPosition,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  }

  const initialCamera = {
    zoom: 8,
    pitch: 0,
    heading: 0,
    altitude: 10,
    center: initialPosition,
  }

  return (
    <MapView
      zoomEnabled
      style={{ flex: 1 }}
      initialCamera={initialCamera}
      initialRegion={initialRegion}
    ></MapView>
  )
}

export default DoorToDoorMapView
