import React, { useMemo, useRef, useState } from 'react'
import { Dimensions, Platform, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  ActionBottomSheet,
  ActionCreateButton,
  ActionFiltersList,
  BottomSheetList,
  CreateEditModal,
  createSource,
  passPeriod,
  passType,
  SelectPeriod,
  SelectType,
  SideActionList,
  SideList,
  useSheetPosition,
} from '@/components/actions'
import { ActionMapView } from '@/components/actions/ActionMapView'
import Text from '@/components/base/Text'
import BoundarySuspenseWrapper, { DefaultErrorFallback } from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import MapboxGl from '@/components/Mapbox/Mapbox'
import { useSession } from '@/ctx/SessionProvider'
import { RestAction } from '@/data/restObjects/RestActions'
import { QUERY_KEY_PAGINATED_ACTIONS, useAction, usePaginatedActions } from '@/hooks/useActions/useActions'
import { LocationPermissionError, QUERY_KEY_LOCATION, useLocation, useLocationPermission } from '@/hooks/useLocation'
import MapButton from '@/screens/doorToDoor/DoorToDoorMapButton'
import LocationAuthorization from '@/screens/doorToDoor/LocationAuthorization'
import { useOnFocus } from '@/utils/useOnFocus.hook'
import { CameraStop } from '@rnmapbox/maps'
import { OnPressEvent } from '@rnmapbox/maps/src/types/OnPressEvent'
import { GalleryHorizontal } from '@tamagui/lucide-icons'
import { useQueryClient } from '@tanstack/react-query'
import { Redirect, router, useLocalSearchParams } from 'expo-router'
import { Feature, Point } from 'geojson'
import { FallbackProps } from 'react-error-boundary'
import { isWeb, Spinner, useMedia, View, YStack } from 'tamagui'
import { useDebouncedCallback } from 'use-debounce'

const ErrorFallback = (props: FallbackProps) => {
  if (props.error instanceof LocationPermissionError) {
    return <LocationAuthorization onAuthorizationRequest={() => props.resetErrorBoundary()} />
  }
  return (
    <PageLayout.StateFrame>
      <DefaultErrorFallback {...props} />
    </PageLayout.StateFrame>
  )
}

export default function ActionsScreen() {
  const { isAuth } = useSession()
  const media = useMedia()

  if (!isAuth) {
    return <Redirect href={'/(tabs)/evenements/'} />
  }

  return (
    <BoundarySuspenseWrapper errorChildren={ErrorFallback}>
      {!isWeb && media.gtMd ? (
        // <PageLayout.StateFrame bg="$white2">
        <YStack flex={1} justifyContent="center" bg="$white2" alignItems="center">
          <GalleryHorizontal size={40} color="$green6" />
          <Text fontSize="$2" color="$green6">
            Tournez votre appareil en mode portrait
          </Text>
        </YStack>
      ) : (
        // </PageLayout.StateFrame>
        <Page />
      )}
    </BoundarySuspenseWrapper>
  )
}

function Page() {
  useLocationPermission()
  const insets = useSafeAreaInsets()
  const media = useMedia()
  const { uuid: activeAction } = useLocalSearchParams<{ uuid: string }>()
  const { scope } = useSession()
  const myScope = scope?.data?.find((x) => x.features.includes('actions'))
  const canIAddAction = Boolean(myScope)
  const queryClient = useQueryClient()

  const {
    data: { coords },
  } = useLocation()

  const [activeTab] = useState<'actions' | 'myActions'>('actions')
  const data = usePaginatedActions({ ...coords, subscribeOnly: activeTab === 'myActions' })
  const actionQuery = useAction(activeAction, { ...coords, subscribeOnly: activeTab === 'myActions' })
  const positionConfig = useSheetPosition(1)
  const { setPosition } = positionConfig
  const [period, setPeriod] = React.useState<SelectPeriod>('week')
  const [type, setType] = React.useState<SelectType>('all')
  const [modalOpen, setModalOpen] = React.useState(false)
  const padding = { paddingBottom: media.gtMd ? 300 : 0, paddingLeft: media.gtMd ? 500 : 0, paddingRight: 0, paddingTop: 0 }

  const filterHeight = useRef(70)
  const [listOpen, setListOpen] = React.useState(true)
  const mapRefs = React.useRef<{ camera: MapboxGl.Camera | null }>(null)
  const flattedActions = data.data?.pages.flatMap((page) => page.items) ?? []
  const filteredActions = flattedActions.filter((action) => {
    return [passPeriod(action.date, period), passType(type, action.type)].every(Boolean)
  })
  const [followUser, setFollowUser] = React.useState(true)
  const source = createSource(filteredActions, activeAction ?? '')

  const refUserPosition = React.useRef<{ longitude: number; latitude: number } | null>(null)

  useOnFocus(() => {
    data.refetch()
  })

  const setActiveAction = (action: RestAction | null) => {
    if (action && activeAction) {
      if (media.md) router.setParams({ uuid: '' })
      setTimeout(() => {
        router.setParams({ uuid: action.uuid })
      }, 0)
    } else {
      router.setParams({ uuid: action?.uuid ?? '' })
    }
  }

  const handleLocationChange = (coordsPayload?: { longitude: number; latitude: number }, moveToCoord = true) => {
    if (coordsPayload) {
      followUser && setFollowUser(false)
      queryClient.setQueryData([QUERY_KEY_LOCATION], { coords: coordsPayload })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PAGINATED_ACTIONS] })
    }
    if (moveToCoord) {
      const coords = coordsPayload ?? refUserPosition.current
      if (coords) {
        setTimeout(() => {
          mapRefs.current?.camera?.setCamera({
            centerCoordinate: [coords.longitude, coords.latitude],
            zoomLevel: 14,
            animationMode: 'easeTo',
            animationDuration: 30,
            padding,
          })
        }, 100)
      }
    }
  }

  const debouncedHandleLocationChange = useDebouncedCallback(handleLocationChange, 1000)

  const setCameraBySnapPercent = (snapPercent: number, cameraSetting?: CameraStop) => {
    const height = Dimensions.get('window').height
    const paddingBottom = media.md ? (height * snapPercent) / 100 - (insets.top + filterHeight.current + 40) : 0
    mapRefs.current?.camera?.setCamera({
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
    setActiveAction(action)

    setFollowUser(false)
    setTimeout(() => {
      setCameraBySnapPercent(49, {
        centerCoordinate: [action.post_address.longitude, action.post_address.latitude],
        zoomLevel: 16,
        animationMode: 'easeTo',
        animationDuration: 300,
      })
    }, 200)
    setListOpen(false)
  }

  const handleOnActionLayerPress = (e: OnPressEvent) => {
    if (e.features.length === 0) {
      setActiveAction(null)
      setListOpen(true)
      return
    }

    const [cluster] = e.features as Feature<Point>[]
    handleActiveAction(flattedActions.find((action) => action.uuid === cluster.properties?.uuid) ?? null)
  }

  const onCloseModal = () => setModalOpen(false)

  const modal = <CreateEditModal open={modalOpen} onClose={onCloseModal} activeAction={activeAction} scope={myScope?.code} />

  const filtersBtns = useMemo(
    () => (
      <ActionFiltersList
        onLocationChange={handleLocationChange}
        onAddressReset={() => handleLocationChange(refUserPosition.current ?? undefined)}
        type={type}
        period={period}
        onPeriodChange={setPeriod}
        onTypeChange={setType}
        bg="$transparentColor"
        position="absolute"
        top={5}
        zIndex={100}
        left={0}
        right={0}
      />
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

  const sideList = (
    <SideList actions={filteredActions} postionConfig={positionConfig} open={listOpen} onOpenChange={setListOpen} setActiveAction={handleActiveAction}>
      <YStack height={200}>
        <ActionFiltersList
          onLocationChange={handleLocationChange}
          onAddressReset={() => handleLocationChange(refUserPosition.current ?? undefined)}
          type={type}
          period={period}
          onPeriodChange={setPeriod}
          onTypeChange={setType}
          zIndex={10000}
        />
        <YStack pl="$3">
          <ActionCreateButton width={200} onPress={() => setModalOpen(true)} />
        </YStack>
      </YStack>
    </SideList>
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

            mapRefs.current?.camera?.setCamera({
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

  const sideActionList = useMemo(
    () => (
      <SideActionList
        actionQuery={actionQuery}
        onEdit={() => setModalOpen(true)}
        onOpenChange={(open) => {
          if (!open) {
            setActiveAction(null)
            setListOpen(true)

            // mapRefs.current?.camera?.setCamera({
            //   padding: { paddingBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 },
            //   animationMode: 'easeTo',
            //   animationDuration: 300,
            // })
          }
        }}
        onPositionChange={(_, percent) => setCameraBySnapPercent(percent)}
      />
    ),
    [actionQuery],
  )

  const handleMapPress = () => {
    setActiveAction(null)
    if (listOpen) {
      setPosition(1)
    } else {
      setListOpen(true)
    }
    mapRefs.current?.camera?.setCamera({
      padding: { paddingBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 },
      animationMode: 'easeTo',
      animationDuration: 300,
    })
  }

  const handleOnUserLocationChange = (location: { longitude: number; latitude: number }) => {
    refUserPosition.current = location
  }

  const handleOnCameraChange = (location: { longitude: number; latitude: number }) => {
    debouncedHandleLocationChange(location, false)
  }

  const mapView = useMemo(
    () => (
      <ActionMapView
        ref={mapRefs}
        source={source}
        onCameraChange={handleOnCameraChange}
        onActionPress={handleOnActionLayerPress}
        onMapPress={handleMapPress}
        coords={coords}
        onUserPositionChange={handleOnUserLocationChange}
        followUser={followUser}
        padding={padding}
      />
    ),
    [coords, followUser, source, padding],
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

              mapRefs.current?.camera?.setCamera({
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
        {media.gtMd && sideActionList}
        {media.gtMd && sideList}
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
          {media.md && filtersBtns}

          {mapView}
        </YStack>
        {media.md && <ActionCreateButton onPress={() => setModalOpen(true)} style={styles.createActionContainer} display={canIAddAction ? 'flex' : 'none'} />}
        {Platform.OS === 'ios' || Platform.OS === 'web' ? modal : null}

        {media.md && bottomSheetList}
        {media.md && actionBottomSheet}
        {Platform.OS === 'android' ? modal : null}
        {mapButton}
      </YStack>
    </>
  )
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
