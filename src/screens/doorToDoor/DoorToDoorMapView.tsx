import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native'
import MapView from 'react-native-map-clustering'
import { LatLng, Marker, Region } from 'react-native-maps'
import { DoorToDoorAddress } from '../../core/entities/DoorToDoor'
import { Colors, Spacing, Typography } from '../../styles'
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
import { GetDoorToDoorCampaignPopupInteractor } from '../../core/interactor/GetDoorToDoorCampaignPopupInteractor'
import { DoorToDoorCampaignCardViewModel } from './DoorToDoorCampaignCardViewModel'
import MapButton from './DoorToDoorMapButton'
import { HorizontalSpacer } from '../shared/Spacer'
import Map from 'react-native-maps'

const DEFAULT_DELTA = 0.01

type Props = {
  data: DoorToDoorAddress[]
  location: LatLng
  onAddressPress: (id: string) => void
  onSearchHerePressed: (location: LatLng) => void
  onCampaignRankingSelected: (campaignId: string) => void
}

type PopupProps = {
  visible: boolean
  value?: DoorToDoorAddress
}

const DoorToDoorMapView = ({
  data,
  location,
  onAddressPress,
  onSearchHerePressed,
  onCampaignRankingSelected,
}: Props) => {
  const mapRef = useRef<Map | null>(null)
  const [currentPosition, setCurrentPosition] = useState<LatLng>(location)
  const [popup, setPopup] = useState<PopupProps>({
    visible: false,
    value: undefined,
  })
  const [currentRegion, setCurrentRegion] = useState<Region>()
  const markerExtraProps = { cluster: false }

  const initialPosition = {
    latitude: location.latitude,
    longitude: location.longitude,
  }

  const initialRegion = {
    ...initialPosition,
    latitudeDelta: DEFAULT_DELTA,
    longitudeDelta: DEFAULT_DELTA,
  }

  const moveToCurrentPositionRegion = () => {
    if (mapRef.current !== null) {
      let region = {
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude,
        latitudeDelta: DEFAULT_DELTA,
        longitudeDelta: DEFAULT_DELTA,
      }
      mapRef.current.animateToRegion(region, 2000)
    }
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

  const Popup = () => {
    const [
      viewModel,
      setViewModel,
    ] = useState<DoorToDoorCampaignCardViewModel>()

    useEffect(() => {
      if (popup.value) {
        new GetDoorToDoorCampaignPopupInteractor()
          .execute(popup.value?.building.campaignStatistics.campaignId)
          .then((result) => {
            setViewModel(DoorToDoorCampaignCardViewModelMapper.map(result))
          })
      }
    }, [])

    return (
      <Pressable
        style={styles.popupWrap}
        onPress={() => setPopup({ visible: false })}
      >
        <Pressable style={styles.popup}>
          <PoiAddressCard
            onPress={onAddressPress}
            viewModel={PoiAddressCardViewModelMapper.map('map', popup.value)}
          />
          {viewModel ? (
            <DoorToDoorCampaignCard
              viewModel={viewModel}
              onPress={(campaignId: string) => {
                onCampaignRankingSelected(campaignId)
              }}
            />
          ) : null}
        </Pressable>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
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
        onRegionChangeComplete={(region: Region) => {
          setCurrentRegion(region)
        }}
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
      <View style={styles.childContainer}>
        <View style={styles.mapButtonListContainer}>
          <MapButton
            onPress={() => {
              if (currentRegion) {
                onSearchHerePressed({
                  latitude: currentRegion.latitude,
                  longitude: currentRegion.longitude,
                })
              }
            }}
            text="Rechercher dans la zone"
            image={require('./../../assets/images/loopArrow.png')}
          />
          <HorizontalSpacer spacing={Spacing.margin} />
          <MapButton
            onPress={moveToCurrentPositionRegion}
            image={require('./../../assets/images/gpsPosition.png')}
          />
        </View>
      </View>
      {popup.visible && <Popup />}
    </View>
  )
}

const styles = StyleSheet.create({
  childContainer: {
    position: 'absolute',
    width: '100%',
  },
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  map: {
    flex: 1,
  },
  mapButtonIcon: {
    alignSelf: 'center',
    height: 16,
    width: 16,
  },
  mapButtonListContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: Spacing.margin,
  },
  mapButtonText: {
    ...Typography.callout,
    alignSelf: 'center',
    marginLeft: Spacing.small,
    textAlign: 'center',
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
  searchHereButton: {
    borderRadius: 20,
    flex: 0,
    overflow: 'hidden',
  },
  searchHereButtonContainer: {
    backgroundColor: Colors.defaultBackground,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 40,
    minWidth: 40,
    padding: Spacing.unit,
  },
})

export default DoorToDoorMapView
