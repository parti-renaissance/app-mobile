import React, { useMemo, useRef } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '@/components'
import AddressAutocomplete from '@/components/AddressAutoComplete/AddressAutocomplete'
import Select from '@/components/base/Select/Select'
import Text from '@/components/base/Text'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import { ActionCard, ActionVoxCardProps } from '@/components/Cards'
import MapboxGl from '@/components/Mapbox/Mapbox'
import ProfilePicture from '@/components/ProfilePicture'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import VoxCard from '@/components/VoxCard/VoxCard'
import clientEnv from '@/config/clientEnv'
import { useSession } from '@/ctx/SessionProvider'
import { Action, ActionType, isFullAction, RestAction, RestActionAuthor, RestActionParticipant } from '@/data/restObjects/RestActions'
import { QUERY_KEY_PAGINATED_ACTIONS, useAction, usePaginatedActions } from '@/hooks/useActions/useActions'
import { useLazyRef } from '@/hooks/useLazyRef'
import { QUERY_KEY_LOCATION, useLocation, useLocationPermission } from '@/hooks/useLocation'
import MapButton from '@/screens/doorToDoor/DoorToDoorMapButton'
import { CameraStop } from '@rnmapbox/maps'
import { OnPressEvent } from '@rnmapbox/maps/src/types/OnPressEvent'
import { useQueryClient } from '@tanstack/react-query'
import { addDays, isSameDay, isSameWeek } from 'date-fns'
import { Redirect, router, useLocalSearchParams } from 'expo-router'
import { Feature, Point } from 'geojson'
import { isWeb, ScrollView, Sheet, Spinner, View, XStack, YStack, YStackProps, ZStack } from 'tamagui'
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
  const insets = useSafeAreaInsets()
  const { id: activeAction } = useLocalSearchParams<{ id: string }>()

  const queryClient = useQueryClient()

  const {
    data: { coords },
  } = useLocation()

  const data = usePaginatedActions(coords)
  const actionQuery = useAction(activeAction, coords)

  const positionConfig = useSheetPosition(1)
  const { setPosition } = positionConfig
  const [period, setPeriod] = React.useState<SelectPeriod>('week')
  const [type, setType] = React.useState<SelectType>('all')
  const filterHeight = useRef(70)
  const [listOpen, setListOpen] = React.useState(true)
  const cameraRef = React.useRef<MapboxGl.Camera>(null)
  const flattedActions = data.data?.pages.flatMap((page) => page.items) ?? []
  const filteredActions = flattedActions.filter((action) => {
    return [
      // passPeriod(action.date, period),
      passType(type, action.type),
    ].every(Boolean)
  })
  const setActiveAction = (action: RestAction | null) => {
    router.setParams({ id: action?.uuid ?? '' })
  }
  const [followUser, setFollowUser] = React.useState(true)
  const source = createSource(filteredActions, activeAction ?? '')

  const refUserPosition = React.useRef<{ longitude: number; latitude: number } | null>(null)

  const handleLocationChange = (coordsPayload: { longitude: number; latitude: number }) => {
    followUser && setFollowUser(false)
    queryClient.setQueryData([QUERY_KEY_LOCATION], { coords: coordsPayload })
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PAGINATED_ACTIONS] })
    cameraRef.current?.setCamera({
      centerCoordinate: [coordsPayload.longitude, coordsPayload.latitude],
      zoomLevel: 14,
      animationMode: 'easeTo',
      animationDuration: 30,
    })
  }

  const setCameraBySnapPercent = (snapPercent: number, cameraSetting?: CameraStop) => {
    const height = Dimensions.get('window').height
    const paddingBottom = (height * snapPercent) / 100 - (insets.top + filterHeight.current + 40)
    cameraRef.current?.setCamera({
      padding: { paddingBottom, paddingLeft: 0, paddingRight: 0, paddingTop: 0 },
      animationMode: 'easeTo',
      ...cameraSetting,
    })
  }

  const handleActiveAction = (action: RestAction | null) => {
    if (!action) {
      setActiveAction(null)
      setListOpen(true)
      return
    }
    const { post_address } = action
    setActiveAction(action)
    setFollowUser(false)
    setTimeout(() => {
      setCameraBySnapPercent(30, {
        centerCoordinate: [post_address.longitude, post_address.latitude],
        zoomLevel: 16,
        animationMode: 'easeTo',
        animationDuration: 300,
      })
    })
    setListOpen(false)
  }

  const handlePress = (e: OnPressEvent) => {
    if (e.features.length === 0) {
      setActiveAction(null)
      setListOpen(true)
      return
    }

    const [cluster] = e.features as Feature<Point>[]
    handleActiveAction(flattedActions.find((action) => action.uuid === cluster.properties?.uuid) ?? null)
  }

  return (
    <YStack flex={1} flexDirection="column" position="relative">
      <YStack height={filterHeight.current} bg="$white1" display={activeAction ? 'none' : 'flex'}>
        <ScrollView horizontal flex={1} contentContainerStyle={{ p: '$3' }} keyboardShouldPersistTaps="always">
          <XStack gap="$3">
            <AddressAutocomplete
              maxWidth={100}
              labelOnlySheet
              setAddressComponents={({ location }) => {
                if (!location) return
                handleLocationChange({ longitude: location.lng, latitude: location.lat })
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
            if (listOpen) {
              setPosition(1)
            } else {
              setListOpen(true)
            }
            cameraRef.current?.setCamera({
              padding: { paddingBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 },
              animationMode: 'easeTo',
              animationDuration: 300,
            })
          }}
        >
          <MapboxGl.Camera ref={cameraRef} followUserLocation={followUser} followUserMode={MapboxGl.UserTrackingMode.Follow} followZoomLevel={14} />
          <MapboxGl.UserLocation
            visible
            onUpdate={(x) => {
              refUserPosition.current = { longitude: x.coords.longitude, latitude: x.coords.latitude }
            }}
          />

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
              symbol-sort-key={['to-number', ['get', 'priority']]}
              filter={['has', 'type']}
              style={{
                iconImage: getDynamicMarkerIcon,
                iconSize: isWeb ? 0.5 : 1,
                iconAllowOverlap: true,
                iconOffset: [1, -20],
                symbolSortKey: ['to-number', ['get', 'priority']],
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
                const userCoords = refUserPosition.current
                if (!userCoords) return
                handleLocationChange(userCoords)
                cameraRef.current?.setCamera({
                  centerCoordinate: [userCoords.longitude, userCoords.latitude],
                  animationMode: 'easeTo',
                  animationDuration: 300,
                  zoomLevel: 14,
                })
              }}
              image={require('@/assets/images/gpsPosition.png')}
            />
          )}
        </View>
      </YStack>
      <BottomSheetList
        actions={filteredActions}
        postionConfig={positionConfig}
        open={listOpen}
        onOpenChange={setListOpen}
        setActiveAction={handleActiveAction}
      />
      <ActionBottomSheet
        actionQuery={actionQuery}
        onOpenChange={(open) => {
          if (!open) {
            setActiveAction(null)
            setListOpen(true)

            cameraRef.current?.setCamera({
              padding: { paddingBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 },
              animationMode: 'easeTo',
              animationDuration: 300,
            })
          }
        }}
        onPositionChange={(_, percent) => setCameraBySnapPercent(percent)}
      />
    </YStack>
  )
}

type ActionListProps = {
  actions: RestAction[]
  setActiveAction: (action: RestAction | null) => void
}

const ActionList = (props: ActionListProps) => {
  return props.actions.length === 0 ? (
    <Spinner />
  ) : (
    props.actions.map((action) => <ActionCard key={action.uuid} payload={mapPayload(action)} onShow={() => props.setActiveAction(action)} />)
  )
}

const BottomSheetList = ({
  postionConfig,
  onOpenChange,
  open,
  ...props
}: ActionListProps & { postionConfig: ReturnType<typeof useSheetPosition>; open: boolean; onOpenChange: (x: boolean) => void }) => {
  const { position, setPosition, handleHandlePress, defaultPosition } = postionConfig
  const handlePositionChange = (position: number) => {
    setPosition(position)
  }

  const handleOpeningChange = (open: boolean) => {
    onOpenChange(open)
    if (!open) {
      setPosition(1)
    }
  }

  const pageMode = position === 0

  return (
    <Sheet
      open={open}
      defaultOpen={true}
      defaultPosition={defaultPosition}
      position={position}
      dismissOnOverlayPress={false}
      onPositionChange={handlePositionChange}
      onOpenChange={handleOpeningChange}
      snapPoints={['70%', 60]}
      snapPointsMode="mixed"
    >
      <Sheet.Frame borderTopLeftRadius={pageMode ? 0 : 20} borderTopRightRadius={pageMode ? 0 : 20}>
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

type ActionBottomSheetProps = {
  actionQuery: ReturnType<typeof useAction>
  onPositionChange?: (position: number, percent: number) => void
  onOpenChange?: (open: boolean) => void
}

function ActionBottomSheet({ actionQuery, onPositionChange, onOpenChange }: Readonly<ActionBottomSheetProps>) {
  const { position, setPosition, handleHandlePress, defaultPosition } = useSheetPosition(1)
  const { data: action, isLoading } = actionQuery

  const _position = !action ? 1 : position

  React.useEffect(() => {
    if (!action) {
      setPosition(1)
    }
  }, [action])

  const snapPoints = useLazyRef<[number, number]>(() => [70, 30])

  const handlePositionChange = (position: number) => {
    setPosition(position)
    onPositionChange?.(position, snapPoints.current[position])
  }

  const handleOpeningChange = (open: boolean) => {
    setPosition(1)
    onOpenChange?.(open)
  }

  const payload = useMemo(() => (action ? mapPayload(action) : null), [action])

  return (
    <Sheet
      modal
      open={!!action}
      defaultPosition={defaultPosition}
      position={_position}
      onOpenChange={handleOpeningChange}
      onPositionChange={handlePositionChange}
      dismissOnOverlayPress={false}
      snapPoints={snapPoints.current}
      snapPointsMode="percent"
      dismissOnSnapToBottom
      key={action?.uuid}
    >
      <Sheet.Frame borderTopLeftRadius={20} borderTopRightRadius={20} position="relative">
        <YStack onPress={handleHandlePress}>
          <Sheet.Handle backgroundColor="$textDisabled" mt="$3.5" mb="$0" height={3} width={50} alignSelf="center" onPress={handleHandlePress} />
        </YStack>
        <YStack paddingHorizontal={'$4.5'} pt="$2" pb="$5" elevation={1} bottom={0} bg="$white1" zIndex={100_000_000} position="absolute" width="100%">
          <Button size="lg" width="100%" bg="$green7">
            <Button.Text>M'inscrire</Button.Text>
          </Button>
        </YStack>
        <Sheet.ScrollView
          scrollEnabled={position === 0}
          flex={1}
          contentContainerStyle={{
            pt: '$2',
            pb: '$12',
            gap: '$2',
          }}
        >
          {payload && action ? (
            <ActionCard payload={payload} asFull>
              {isFullAction(action) ? <VoxCard.Description full>{action.description}</VoxCard.Description> : <SkeCard.Description />}
              {isFullAction(action) ? (
                <>
                  <Text fontWeight="$5">{action.participants.length} inscrits :</Text>
                  <XStack flexWrap="wrap" gap="$5" justifyContent="space-between">
                    <ParticipantAvatar participant={action.author} />
                    {action.participants.map((participant) => (
                      <ParticipantAvatar key={participant.uuid} participant={participant} alignSelf="flex-start" />
                    ))}
                  </XStack>
                </>
              ) : null}
            </ActionCard>
          ) : null}

          {payload === null && isLoading ? (
            <SkeCard>
              <SkeCard.Chip />
              <SkeCard.Title />
              <SkeCard.Description />
            </SkeCard>
          ) : null}
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  )
}

function ParticipantAvatar({ participant, ...props }: Readonly<{ participant: RestActionParticipant | RestActionAuthor }> & YStackProps) {
  const getIsAuthor = (guy: RestActionParticipant | RestActionAuthor): guy is RestActionAuthor => 'first_name' in guy
  const isAuthor = getIsAuthor(participant)
  const namesContainer = isAuthor ? participant : participant.adherent
  const fullName = `${namesContainer.first_name} ${namesContainer.last_name}`
  return (
    <YStack justifyContent="center" alignItems="center" gap="$2" {...props} overflow="hidden" width={90}>
      <YStack position="relative" width={'100%'} justifyContent="center" alignItems="center">
        <ProfilePicture size="$5" fullName={fullName} alt={`Photo de ${fullName}`} rounded borderBlockColor="$textPrimary" borderWidth={isAuthor ? 1 : 0} />
        {isAuthor && (
          <YStack position="absolute" bottom={0} width="100%" justifyContent="center" alignContent="center" alignItems="center">
            <YStack
              borderBlockColor="$textPrimary"
              borderWidth={1}
              borderRadius="$4"
              justifyContent="center"
              alignContent="center"
              bg="$white1"
              p={2}
              paddingHorizontal="$2.5"
            >
              <Text fontSize="$1" color="$textPrimary" textAlign="center" fontWeight="$5">
                Auteur
              </Text>
            </YStack>
          </YStack>
        )}
      </YStack>
      <YStack justifyContent="center" alignItems="center" gap="$2">
        <Text numberOfLines={1} color={isAuthor ? '$textPrimary' : '$textSecondary'}>
          {namesContainer.first_name}
        </Text>
        <Text numberOfLines={1} color={isAuthor ? '$textPrimary' : '$textSecondary'}>
          {namesContainer.last_name}
        </Text>
      </YStack>
    </YStack>
  )
}

function mapPayload(action: Action): ActionVoxCardProps['payload'] {
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

function createSource(actions: RestAction[], active: string): MapboxGl.ShapeSource['props']['shape'] {
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
          priority: isActive ? 1 : 0,
          isActive,
          ...action,
        },
      }
    }),
  }
}

function useSheetPosition(defaultPosition: number) {
  const [position, setPosition] = React.useState(defaultPosition)
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
  return {
    defaultPosition,
    position,
    setPosition,
    handleHandlePress,
  }
}

const styles = StyleSheet.create({
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
})
