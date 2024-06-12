import React, { useMemo, useRef, useState } from 'react'
import { Dimensions, Platform, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ActionForm from '@/components/ActionForm/ActionForm'
import AddressAutocomplete from '@/components/AddressAutoComplete/AddressAutocomplete'
import Select from '@/components/base/Select/Select'
import Text from '@/components/base/Text'
import BoundarySuspenseWrapper, { DefaultErrorFallback } from '@/components/BoundarySuspenseWrapper'
import Button from '@/components/Button'
import GradientButton from '@/components/Buttons/GradientButton'
import { ActionCard, ActionVoxCardProps, SubscribeButton } from '@/components/Cards'
import EmptyState from '@/components/EmptyStates/EmptyEvent/EmptyEvent'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import MapboxGl from '@/components/Mapbox/Mapbox'
import MobileWallLayout from '@/components/MobileWallLayout/MobileWallLayout'
import ModalOrPageBase from '@/components/ModalOrPageBase/ModalOrPageBase'
import ProfilePicture from '@/components/ProfilePicture'
import SkeCard from '@/components/Skeleton/CardSkeleton'
// import { Tabs } from '@/components/Tabs/Tabs'
import VoxCard from '@/components/VoxCard/VoxCard'
import clientEnv from '@/config/clientEnv'
import { useSession } from '@/ctx/SessionProvider'
import { Action, ActionStatus, ActionType, isFullAction, RestAction, RestActionAuthor, RestActionParticipant } from '@/data/restObjects/RestActions'
import { QUERY_KEY_PAGINATED_ACTIONS, useAction, usePaginatedActions } from '@/hooks/useActions/useActions'
import { useLazyRef } from '@/hooks/useLazyRef'
import { LocationPermissionError, QUERY_KEY_LOCATION, useLocation, useLocationPermission } from '@/hooks/useLocation'
import MapButton from '@/screens/doorToDoor/DoorToDoorMapButton'
import LocationAuthorization from '@/screens/doorToDoor/LocationAuthorization'
import { useOnFocus } from '@/utils/useOnFocus.hook'
import { CameraStop } from '@rnmapbox/maps'
import { OnPressEvent } from '@rnmapbox/maps/src/types/OnPressEvent'
import { Plus } from '@tamagui/lucide-icons'
import { useQueryClient } from '@tanstack/react-query'
import * as turf from '@turf/turf'
import { addDays, isBefore, isSameDay, isSameWeek } from 'date-fns'
import { Redirect, router, useLocalSearchParams } from 'expo-router'
import { Feature, Point } from 'geojson'
import { isWeb, ScrollView, Sheet, Spinner, useMedia, View, XStack, YStack, YStackProps } from 'tamagui'
import { useDebouncedCallback } from 'use-debounce'
import markersImage from '../../../assets/images/generated-markers-lib'

const getMarkerIcon = (type: ActionType) => [['==', ['get', 'type'], type], type]
const getActiveMarketIcon = (type: ActionType) => [['==', ['get', 'type'], type], `${type}Active`]

const filterIsActiveAndCancel = ['all', ['==', ['get', 'status'], ActionStatus.CANCELLED], ['==', ['get', 'isActive'], true]]
const getCancelledMarkerIcon = (type: ActionType) => [['==', ['get', 'type'], type], `${type}-${ActionStatus.CANCELLED}`]
const getCancelledActiveMarketIcon = (type: ActionType) => [['==', ['get', 'type'], type], `${type}Active-${ActionStatus.CANCELLED}`]
const getPassedMarkerIcon = (type: ActionType) => [['==', ['get', 'type'], type], `${type}-passed`]
const getPassedActiveMarketIcon = (type: ActionType) => [['==', ['get', 'type'], type], `${type}Active-passed`]
const filterIsActiveAndPassed = ['all', ['==', ['get', 'isPassed'], true], ['==', ['get', 'isActive'], true]]
const getDynamicMarkerIcon = [
  'case',
  filterIsActiveAndCancel,
  ['case', ...Object.values(ActionType).flatMap(getCancelledActiveMarketIcon), ActionType.TRACTAGE],
  filterIsActiveAndPassed,
  ['case', ...Object.values(ActionType).flatMap(getPassedActiveMarketIcon), ActionType.TRACTAGE],
  ['==', ['get', 'status'], ActionStatus.CANCELLED],
  ['case', ...Object.values(ActionType).flatMap(getCancelledMarkerIcon), ActionType.TRACTAGE],
  ['==', ['get', 'isPassed'], true],
  ['case', ...Object.values(ActionType).flatMap(getPassedMarkerIcon), ActionType.TRACTAGE],
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

  if (Platform.OS === 'web') {
    return <MobileWallLayout />
  }

  return (
    <BoundarySuspenseWrapper
      errorChildren={(props) => {
        if (props.error instanceof LocationPermissionError) {
          return <LocationAuthorization onAuthorizationRequest={() => props.resetErrorBoundary()} />
        }
        return (
          <PageLayout.StateFrame>
            <DefaultErrorFallback {...props} />
          </PageLayout.StateFrame>
        )
      }}
    >
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
      return isSameWeek(new Date(), date)
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
  const { uuid: activeAction } = useLocalSearchParams<{ uuid: string }>()
  const { scope } = useSession()

  const myScope = scope?.data?.find((x) => x.features.includes('actions'))

  const canIAddAction = Boolean(myScope)

  const queryClient = useQueryClient()

  const {
    data: { coords },
  } = useLocation()

  const [activeTab, setActiveTab] = useState<'actions' | 'myActions'>('actions')
  const data = usePaginatedActions({ ...coords, subscribeOnly: activeTab === 'myActions' })
  const actionQuery = useAction(activeAction, { ...coords, subscribeOnly: activeTab === 'myActions' })
  const positionConfig = useSheetPosition(1)
  const { setPosition } = positionConfig
  const [period, setPeriod] = React.useState<SelectPeriod>('week')
  const [type, setType] = React.useState<SelectType>('all')
  const [modalOpen, setModalOpen] = React.useState(false)
  const media = useMedia()

  const filterHeight = useRef(70)
  const [listOpen, setListOpen] = React.useState(true)
  const cameraRef = React.useRef<MapboxGl.Camera>(null)
  const flattedActions = data.data?.pages.flatMap((page) => page.items) ?? []
  const filteredActions = flattedActions.filter((action) => {
    return [passPeriod(action.date, period), passType(type, action.type)].every(Boolean)
  })

  useOnFocus(() => {
    data.refetch()
    // actionQuery.refetch()
  })

  const setActiveAction = (action: RestAction | null) => {
    if (action && activeAction) {
      router.setParams({ uuid: '' })
      setTimeout(() => {
        router.setParams({ uuid: action.uuid })
      }, 0)
    } else {
      router.setParams({ uuid: action?.uuid ?? '' })
    }
  }
  const [followUser, setFollowUser] = React.useState(true)
  const source = createSource(filteredActions, activeAction ?? '')

  const refUserPosition = React.useRef<{ longitude: number; latitude: number } | null>(null)

  const handleLocationChange = (coordsPayload: { longitude: number; latitude: number }, moveToCoord = true) => {
    followUser && setFollowUser(false)
    queryClient.setQueryData([QUERY_KEY_LOCATION], { coords: coordsPayload })
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PAGINATED_ACTIONS] })
    if (moveToCoord)
      cameraRef.current?.setCamera({
        centerCoordinate: [coordsPayload.longitude, coordsPayload.latitude],
        zoomLevel: 14,
        animationMode: 'easeTo',
        animationDuration: 30,
      })
  }

  const debouncedHandleLocationChange = useDebouncedCallback(handleLocationChange, 1000)

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
      setCameraBySnapPercent(49, {
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

  const onCloseModal = () => setModalOpen(false)

  const modal = useMemo(
    () => (
      <ModalOrPageBase open={modalOpen} onClose={onCloseModal} shouldDisplayCloseHeader>
        {modalOpen && <ActionForm onCancel={onCloseModal} onClose={onCloseModal} uuid={activeAction} scope={myScope?.code} />}
      </ModalOrPageBase>
    ),
    [modalOpen, activeAction],
  )

  const createActionButton = useMemo(
    () => (
      <View style={styles.createActionContainer} display={canIAddAction ? 'flex' : 'none'}>
        <GradientButton round onPress={() => setModalOpen(true)} style={{ display: modalOpen ? 'none' : 'block' }}>
          <Plus color="$purple7" size="$1" />
          <Button.Text fontSize="$2" fontWeight="$7" color="$purple7">
            Créer une action
          </Button.Text>
        </GradientButton>
      </View>
    ),
    [canIAddAction, modalOpen],
  )

  const filtersBtns = useMemo(
    () => (
      <YStack bg="transparent" display={activeAction ? 'none' : 'flex'} position="absolute" top={5} zIndex={100} left={0} right={0}>
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
    ),
    [activeAction, period, type],
  )

  const bottomSheetList = useMemo(
    () => (
      <BottomSheetList
        actions={filteredActions}
        postionConfig={positionConfig}
        open={listOpen}
        onOpenChange={setListOpen}
        setActiveAction={handleActiveAction}
      />
    ),
    [filteredActions, listOpen],
  )

  const actionBottomSheet = useMemo(
    () => (
      <ActionBottomSheet
        actionQuery={actionQuery}
        onEdit={() => setModalOpen(true)}
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
    ),
    [actionQuery],
  )

  const mapView = useMemo(
    () => (
      <MapboxGl.MapView
        styleURL="mapbox://styles/larem/clwaph1m1008501pg1cspgbj2"
        style={{ flex: 1 }}
        scaleBarEnabled={false}
        onCameraChanged={(el) => {
          if (!el.gestures.isGestureActive) return
          const center = el.properties.center
          const dataPoint = turf.point([coords.longitude, coords.latitude])
          const distanceFromCamera = turf.distance(dataPoint, turf.point([center[0], center[1]]), { units: 'meters' })

          if (distanceFromCamera > 1000) {
            debouncedHandleLocationChange({ longitude: center[0], latitude: center[1] }, false)
          }
        }}
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
    ),
    [coords, followUser, source],
  )

  const mapButton = useMemo(
    () => (
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
    ),
    [],
  )

  return (
    <>
      {/* <Tabs<'actions' | 'myActions'>
        value={activeTab}
        onChange={setActiveTab}
        grouped={media.lg}
        $gtMd={{ paddingHorizontal: '$7', paddingTop: '$6', paddingBottom: 0 }}
      >
        <Tabs.Tab id="actions">Toutes les actions</Tabs.Tab>
        <Tabs.Tab id="myActions">J'y participe</Tabs.Tab>
      </Tabs> */}
      <YStack flex={1} flexDirection="column" position="relative">
        <YStack flex={1} position="relative">
          {data.isLoading && (
            <YStack
              backgroundColor="$gray/48"
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              justifyContent="center"
              alignItems="center"
              zIndex={10}
            >
              <Spinner size="large" color="$green8" />
            </YStack>
          )}
          {filtersBtns}

          {mapView}
        </YStack>

        {createActionButton}
        {Platform.OS === 'ios' || Platform.OS === 'web' ? modal : null}
        {bottomSheetList}
        {actionBottomSheet}
        {Platform.OS === 'android' ? modal : null}
        {mapButton}
      </YStack>
    </>
  )
}

type ActionListProps = {
  actions: RestAction[]
  setActiveAction: (action: RestAction | null) => void
}

const ActionList = (props: ActionListProps) => {
  return props.actions.length === 0 ? (
    <EmptyState state="actions" />
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
      native
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
          {/* {data} */}
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
  onEdit?: () => void
}

function ActionBottomSheet({ actionQuery, onPositionChange, onOpenChange, onEdit }: Readonly<ActionBottomSheetProps>) {
  const { position, setPosition, handleHandlePress, defaultPosition } = useSheetPosition(1)
  const { data: action, isLoading } = actionQuery

  const isMyAction = action && isFullAction(action) && action.editable

  const _position = !action ? 1 : position

  React.useEffect(() => {
    if (!action) {
      setPosition(1)
    }
  }, [action])

  const snapPoints = useLazyRef<[number, number]>(() => [70, 50])

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
      native
      open={!!action}
      defaultPosition={defaultPosition}
      position={_position}
      onOpenChange={handleOpeningChange}
      onPositionChange={handlePositionChange}
      dismissOnOverlayPress={false}
      snapPoints={snapPoints.current}
      snapPointsMode="percent"
      dismissOnSnapToBottom
    >
      <Sheet.Frame borderTopLeftRadius={20} borderTopRightRadius={20} position="relative">
        <YStack onPress={handleHandlePress}>
          <Sheet.Handle backgroundColor="$textDisabled" mt="$3.5" mb="$0" height={3} width={50} alignSelf="center" onPress={handleHandlePress} />
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
              {!isBefore(action.date, new Date()) && !isMyAction ? <SubscribeButton large isRegister={!!action?.user_registered_at} id={action.uuid} /> : null}
              {!isBefore(action.date, new Date()) && isMyAction ? <GradientButton onPress={onEdit}>Editer</GradientButton> : null}
              {isFullAction(action) ? <VoxCard.Description markdown full children={action.description ?? ''} /> : <SkeCard.Description />}
              {isFullAction(action) ? (
                <>
                  <Text fontWeight="$5">{action.participants.length + 1} inscrits :</Text>
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
    id: action.uuid,
    tag: action.type,
    isSubscribed: Boolean(action.user_registered_at),
    date: {
      start: action.date,
      end: action.date,
    },
    status: action.status,
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
          isRegister: !!action.user_registered_at,
          isPassed: isBefore(action.date, new Date()),
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
    alignSelf: 'flex-start',
    height: 40,
    width: 40,
  },
  createActionContainer: {
    flex: 1,
    position: 'absolute',
    right: 10,
    bottom: 80,
  },
  mapButtonSideContainer: {
    flex: 1,
    position: 'absolute',
    left: 10,
    bottom: 80,
  },
})
