import React, { useState } from 'react'
import { Dimensions, Image, Pressable, View } from 'react-native'
import MapView from 'react-native-map-clustering'
import { AddressType } from '../../core/entities/DoorToDoor'
import { Spacing } from '../../styles'
import { CampaignCard } from './CampaignCard'
import { CustomCluster } from './CustomCluster'
import { CustomMarker } from './CustomMarker'
import { PoiAddressCard } from './PoiAddressCard'

type Props = {
  data: AddressType[]
}

const DoorToDoorMapView = ({ data }: Props) => {
  const [showPopup, setShowPopup] = useState(false)
  const [selectedPoi, setSelectedPoi] = useState<AddressType>()

  const initialPosition = { latitude: 48.877018, longitude: 2.32154 } // Paris

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
    setSelectedPoi(poi)
    setShowPopup(true)
  }

  return (
    <>
      <MapView
        zoomEnabled
        liteMode={true}
        style={{ flex: 1 }}
        initialCamera={initialCamera}
        initialRegion={initialRegion}
        renderCluster={(cluster) => <CustomCluster {...cluster} />}
      >
        {data.map((marker) => (
          <CustomMarker
            key={marker.uuid}
            coordinate={marker}
            onPress={() => onMarkerPress(marker)}
          />
        ))}
      </MapView>
      {showPopup && selectedPoi && (
        <Pressable
          style={{
            bottom: 0,
            width: Dimensions.get('window').width,
            height: '100%',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          onPress={() => setShowPopup(false)}
        >
          <Pressable
            style={{
              width: Dimensions.get('window').width - Spacing.margin,
              marginBottom: Spacing.unit,
              zIndex: 300,
            }}
          >
            <PoiAddressCard poi={selectedPoi} />
            <View style={{ height: Spacing.unit }} />
            <CampaignCard />
          </Pressable>
        </Pressable>
      )}
    </>
  )
}

export default DoorToDoorMapView
