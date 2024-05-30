import React from 'react'
import { StyleSheet } from 'react-native'
import AddressAutocomplete from '@/components/AddressAutoComplete/AddressAutocomplete'
import Select from '@/components/base/Select/Select'
import Text from '@/components/base/Text'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import { ActionCard, ActionVoxCardProps } from '@/components/Cards'
import MapboxGl from '@/components/Mapbox/Mapbox'
import clientEnv from '@/config/clientEnv'
import { useSession } from '@/ctx/SessionProvider'
import { ActionType, RestAction } from '@/data/restObjects/RestActions'
import { QUERY_KEY_PAGINATED_ACTIONS, usePaginatedActions } from '@/hooks/useActions/useActions'
import { QUERY_KEY_LOCATION, useLocation, useLocationPermission } from '@/hooks/useLocation'
import MapButton from '@/screens/doorToDoor/DoorToDoorMapButton'
import { OnPressEvent } from '@rnmapbox/maps/src/types/OnPressEvent'
import { useQueryClient } from '@tanstack/react-query'
import { addDays, isSameDay, isSameWeek } from 'date-fns'
import { Redirect } from 'expo-router'
import { Feature, Point } from 'geojson'
import { isWeb, ScrollView, Sheet, Spinner, View, XStack, YStack } from 'tamagui'
import markersImage from '../../../assets/images/generated-markers-lib'

const getMarkerIcon = (type: ActionType) => [['==', ['get', 'type'], type], type]
const getActiveMarketIcon = (type: ActionType) => [['==', ['get', 'type'], type], `${type}Active`]

const getDynamicMarkerIcon = [
  'case',
  ['==', ['get', 'isActive'], true],
  ['case', ...Object.values(ActionType).flatMap(getActiveMarketIcon), ActionType.TRACTAGE],
  ['case', ...Object.values(ActionType).flatMap(getMarkerIcon), ActionType.TRACTAGE],
]

MapboxGl.setAccessToken(clientEnv.MAP_BOX_ACCESS_TOKEN)

const createSource = (actions: RestAction[], active: string): MapboxGl.ShapeSource['props']['shape'] => {
  return {
    type: 'FeatureCollection',
    features: actions.map((action) => {
      const isActive = action.uuid === active
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [action.post_address.longitude, action.post_address.latitude],
        },
        properties: {
          isActive,
          ...action,
        },
      }
    }),
  }
}

export default function ActionsScreen() {
  const { isAuth } = useSession()

  if (!isAuth) {
    return <Redirect href={'/(tabs)/evenements/'} />
  }

  return (
    <BoundarySuspenseWrapper>
      <Page />
    </BoundarySuspenseWrapper>
  )
}

type SelectType = 'all' | ActionType
type SelectPeriod = 'all' | 'today' | 'tomorow' | 'week'

const passPeriod = (date: Date, period: SelectPeriod) => {
  switch (period) {
    case 'today':
      return isSameDay(date, new Date())
    case 'tomorow':
      return isSameDay(date, addDays(new Date(), 1))
    case 'week':
      return isSameWeek(date, new Date())
    default:
      return true
  }
}

const passType = (type: SelectType, actionType: ActionType) => {
  return type === 'all' || actionType === type
}

function Page() {
  useLocationPermission()

  const queryClient = useQueryClient()

  const {
    data: { coords },
  } = useLocation()

  const data = usePaginatedActions(coords)
  const [position, setPosition] = React.useState(1)
  const [period, setPeriod] = React.useState<SelectPeriod>('week')
  const [type, setType] = React.useState<SelectType>('all')

  const cameraRef = React.useRef<MapboxGl.Camera>(null)
  const userLocationRef = React.useRef<MapboxGl.UserLocation>(null)

  const flattedActions = data.data?.pages.flatMap((page) => page.items) ?? []

  const filteredActions = flattedActions.filter((action) => {
    return [passPeriod(action.date, period), passType(type, action.type)].every(Boolean)
  })
  const [activeAction, setActiveAction] = React.useState<RestAction | null>(null)
  const [followUser, setFollowUser] = React.useState(true)
  const source = createSource(filteredActions, activeAction?.uuid ?? '')

  const handleLocationChange = (coordsPayload: { lontitude: number; latitude: number }) => {
    followUser && setFollowUser(false)
    queryClient.setQueryData([QUERY_KEY_LOCATION], { coords: coordsPayload })
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PAGINATED_ACTIONS] })
    cameraRef.current?.setCamera({
      centerCoordinate: [coordsPayload.lontitude, coordsPayload.latitude],
      zoomLevel: 14,
      animationMode: 'easeTo',
      animationDuration: 300,
    })
  }

  const handlePress = (e: OnPressEvent) => {
    if (e.features.length === 0) {
      setActiveAction(null)
      return
    }
    const [cluster] = e.features as Feature<Point>[]

    setActiveAction(flattedActions.find((action) => action.uuid === cluster.properties?.uuid) ?? null)
  }

  return (
    <YStack flex={1} flexDirection="column" position="relative">
      <YStack height={70} bg="$white1">
        <ScrollView horizontal flex={1} contentContainerStyle={{ p: '$3' }} keyboardShouldPersistTaps="always">
          <XStack gap="$3">
            <AddressAutocomplete
              labelOnlySheet
              setAddressComponents={({ location }) => {
                if (!location) return
                handleLocationChange({ lontitude: location.lng, latitude: location.lat })
              }}
            />
            <Select<SelectPeriod>
              search={false}
              labelOnlySheet
              label="Période"
              onChange={setPeriod}
              value={period}
              options={[
                { value: 'all', label: 'Tout' },
                { value: 'today', label: "Ajourd'hui" },
                { value: 'tomorow', label: 'Demain' },
                { value: 'week', label: 'Cette semaine' },
              ]}
              placeholder="Cette semaine"
            />
            <Select<SelectType>
              labelOnlySheet
              search={false}
              label="Type"
              onChange={setType}
              value={type}
              options={[
                { value: 'all', label: 'Tout types' },
                { value: ActionType.TRACTAGE, label: 'Tractage' },
                { value: ActionType.BOITAGE, label: 'Boitage' },
                { value: ActionType.COLLAGE, label: 'Collage' },
                { value: ActionType.PAP, label: 'Porte à porte' },
              ]}
              placeholder="Cette semaine"
            />
          </XStack>
        </ScrollView>
      </YStack>
      <YStack flex={1} position="relative">
        <MapboxGl.MapView
          styleURL="mapbox://styles/larem/clwaph1m1008501pg1cspgbj2"
          style={{ flex: 1 }}
          onPress={() => {
            setActiveAction(null)
            setPosition(1)
          }}
        >
          <MapboxGl.Camera ref={cameraRef} followUserLocation={followUser} followUserMode={MapboxGl.UserTrackingMode.Follow} followZoomLevel={14} />
          <MapboxGl.UserLocation visible />

          <MapboxGl.ShapeSource
            id="actions"
            shape={source}
            clusterMaxZoomLevel={18}
            cluster={false}
            clusterRadius={35}
            onPress={handlePress}
            hitbox={{ width: 20, height: 20 }}
          >
            <MapboxGl.SymbolLayer
              id="layer-action"
              filter={['has', 'type']}
              style={{
                iconImage: getDynamicMarkerIcon,
                iconSize: isWeb ? 0.5 : 1,
                iconAllowOverlap: true,
                iconOffset: [1, -20],
              }}
            />
            <MapboxGl.Images images={markersImage} />
          </MapboxGl.ShapeSource>
        </MapboxGl.MapView>
        <View style={styles.mapButtonSideContainer}>
          {!isWeb && (
            <MapButton
              style={styles.mapButtonLocation}
              onPress={() => {
                setFollowUser(false)

                cameraRef.current?.setCamera({
                  centerCoordinate: userLocationRef.current?.state.coordinates ?? undefined,
                  animationMode: 'easeTo',
                  animationDuration: 300,
                })
                setTimeout(() => {
                  setFollowUser(true)
                }, 300)
              }}
              image={require('@/assets/images/gpsPosition.png')}
            />
          )}
        </View>
      </YStack>
      <BottomSheetList actions={filteredActions} query={data} setPosition={setPosition} position={position} />
    </YStack>
  )
}

type ActionListProps = {
  actions: RestAction[]
  query: ReturnType<typeof usePaginatedActions>
}

const ActionList = (props: ActionListProps) => {
  const mapPayload = (action: RestAction): ActionVoxCardProps['payload'] => {
    return {
      tag: action.type,
      isSubscribed: false,
      date: {
        start: action.date,
        end: action.date,
      },
      location: {
        city: action.post_address.city_name,
        street: action.post_address.address,
        postalCode: action.post_address.postal_code,
      },
      author: {
        name: `${action.author.first_name} ${action.author.last_name}`,
      },
    }
  }

  return props.actions.length === 0 ? <Spinner /> : props.actions.map((action) => <ActionCard key={action.uuid} payload={mapPayload(action)} />)
}

const BottomSheetList = ({ position, setPosition, ...props }: ActionListProps & { position: number; setPosition: (position: number) => void }) => {
  const handlePositionChange = (position: number) => {
    setPosition(position)
  }

  const handleHandlePress = () => {
    switch (position) {
      case 0:
        setPosition(1)
        break
      case 1:
        setPosition(0)
        break
      default:
        setPosition(0)
    }
  }

  const pageMode = position === 0

  return (
    <Sheet
      defaultOpen={true}
      defaultPosition={2}
      position={position}
      dismissOnOverlayPress={false}
      onPositionChange={handlePositionChange}
      snapPoints={['70%', 60]}
      snapPointsMode="mixed"
    >
      <Sheet.Frame borderTopLeftRadius={pageMode ? 0 : 10} borderTopRightRadius={pageMode ? 0 : 10}>
        <YStack onPress={handleHandlePress}>
          <Sheet.Handle backgroundColor="$textDisabled" mt="$3.5" mb="$0" height={3} width={50} alignSelf="center" onPress={handleHandlePress} />
          <XStack justifyContent="center" p="$3">
            <Text fontWeight={'$6'} color="$textDisabled" textAlign="center">
              Toutes les actions
            </Text>
          </XStack>
        </YStack>

        {/* <Sheet.Overlay display={position < 2 ? 'none' : 'flex'} /> */}

        <Sheet.ScrollView
          scrollEnabled={position === 0}
          flex={1}
          contentContainerStyle={{
            pt: '$2',
            pb: '$2',
            backgroundColor: '$gray2',
            gap: '$2',
          }}
        >
          <ActionList {...props} />
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
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
  },
  mapButtonLocation: {
    alignSelf: 'flex-end',
    height: 40,
    width: 40,
  },
  mapButtonSideContainer: {
    flex: 1,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  mapButtonText: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  popup: {
    width: '100%',
    flex: 1,
  },
  popupWrap: {
    alignItems: 'center',
    bottom: 0,
    // height: '100%',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  searchHereButton: {
    borderRadius: 20,
    flex: 0,
    overflow: 'hidden',
  },
  searchHereButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 40,
    minWidth: 40,
  },
})
