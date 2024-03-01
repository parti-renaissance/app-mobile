import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import * as Location from 'expo-location'
import MapView from 'react-native-map-clustering'
import Map, { LatLng, Region } from 'react-native-maps'
import { DoorToDoorAddress } from '../../core/entities/DoorToDoor'
import { GetDoorToDoorCampaignInfoInteractor } from '../../core/interactor/GetDoorToDoorCampaignInfoInteractor'
import { Colors, Spacing, Typography } from '../../styles'
import { DoorToDoorCampaignCard } from './DoorToDoorCampaignCard'
import { DoorToDoorCampaignCardViewModel } from './DoorToDoorCampaignCardViewModel'
import { DoorToDoorCampaignCardViewModelMapper } from './DoorToDoorCampaignCardViewModelMapper'
import MapButton from './DoorToDoorMapButton'
import { DoorToDoorMapCluster } from './DoorToDoorMapCluster'
import { DoorToDoorMapMarker } from './DoorToDoorMapMarker'
import { PoiAddressCard } from './PoiAddressCard'
import { PoiAddressCardViewModelMapper } from './PoiAddressCardViewModelMapper'

const DEFAULT_DELTA = 0.01

type Props = {
  data: DoorToDoorAddress[]
  initialLocation: LatLng
  loading: boolean
  onAddressPress: (id: string) => void
  onSearchNearby: (region: Region) => void
  onCampaignRankingSelected: (campaignId: string) => void
}

type PopupState = {
  visible: boolean
  addressId?: string
}

type PopupProps = Readonly<{
  address?: DoorToDoorAddress
}>

export function getRegionFromLatLng(location: LatLng): Region {
  return {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: DEFAULT_DELTA,
    longitudeDelta: DEFAULT_DELTA,
  }
}

const DoorToDoorMapView = ({
  data,
  initialLocation,
  loading,
  onAddressPress,
  onSearchNearby,
  onCampaignRankingSelected,
}: Props) => {
  const mapRef = useRef<Map | null>(null)
  const [currentPosition, setCurrentPosition] = useState<LatLng>()
  const [popup, setPopup] = useState<PopupState>({
    visible: false,
    addressId: undefined,
  })
  const [currentRegion, setCurrentRegion] = useState<Region>()

  const moveToCurrentPositionRegion = () => {
    if (mapRef.current !== null && currentPosition) {
      mapRef.current?.animateToRegion(
        getRegionFromLatLng({
          longitude: currentPosition.longitude,
          latitude: currentPosition.latitude,
        }),
        1000,
      )
    }
  }

  useEffect(() => {
    let watchId: Location.LocationSubscription | null = null
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 10000,
        distanceInterval: 10,
      },
      (position) => {
        setCurrentPosition({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        })
      },
    ).then((id) => {
      watchId = id
    })

    return () => {
      if (watchId) {
        watchId.remove()
      }
    }
  }, [])

  const onMarkerPress = (address: DoorToDoorAddress) => {
    setPopup({
      visible: true,
      addressId: address.id,
    })
  }

  const Popup: FunctionComponent<PopupProps> = ({ address }) => {
    const [viewModel, setViewModel] =
      useState<DoorToDoorCampaignCardViewModel>()

    useEffect(() => {
      if (address && address.building.campaignStatistics) {
        new GetDoorToDoorCampaignInfoInteractor()
          .execute(address.building.campaignStatistics.campaignId)
          .then((result) => {
            setViewModel(DoorToDoorCampaignCardViewModelMapper.map(result))
          })
      }
    }, [address])

    return (
      <Pressable
        style={styles.popupWrap}
        onPress={() => setPopup({ visible: false })}
      >
        <Pressable style={styles.popup}>
          <PoiAddressCard
            onPress={onAddressPress}
            viewModel={PoiAddressCardViewModelMapper.map(address)}
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
        initialRegion={getRegionFromLatLng(initialLocation)}
        rotateEnabled={false}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsPointsOfInterest={true}
        showsCompass={false}
        showsBuildings={true}
        showsIndoors={false}
        pitchEnabled={false}
        loadingEnabled={true}
        spiralEnabled={false}
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
        minPoints={6}
        nodeSize={8} // performance optimization
      >
        {data.map((marker) => (
          <DoorToDoorMapMarker
            key={marker.id}
            icon={PoiAddressCardViewModelMapper.map(marker)?.mapStatusIcon}
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
          <View style={styles.mapButtonSideContainer} />
          <MapButton
            onPress={() => {
              if (currentRegion) {
                onSearchNearby(currentRegion)
              }
            }}
            text="Rechercher dans la zone"
            image={require('./../../assets/images/loopArrow.png')}
            disabled={loading}
          />
          <View style={styles.mapButtonSideContainer}>
            <MapButton
              style={styles.mapButtonLocation}
              onPress={moveToCurrentPositionRegion}
              image={require('./../../assets/images/gpsPosition.png')}
            />
          </View>
        </View>
      </View>
      {popup.visible && (
        <Popup
          address={
            popup.addressId
              ? data.find((address) => address.id === popup.addressId)
              : undefined
          }
        />
      )}
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
  mapButtonLocation: {
    alignSelf: 'flex-end',
    height: 40,
    width: 40,
  },
  mapButtonSideContainer: {
    flex: 1,
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
