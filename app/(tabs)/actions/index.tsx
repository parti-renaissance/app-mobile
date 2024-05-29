import React, { forwardRef } from 'react'
import { Dimensions, FlatList } from 'react-native'
import Select from '@/components/base/Select/Select'
import Text from '@/components/base/Text'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import { ActionCard, ActionVoxCardProps } from '@/components/Cards'
import MapboxGl from '@/components/Mapbox/Mapbox'
import clientEnv from '@/config/clientEnv'
import { useSession } from '@/ctx/SessionProvider'
import { RestAction } from '@/data/restObjects/RestActions'
import { useSuspensePaginatedActions } from '@/hooks/useActions/useActions'
import { useLazyRef } from '@/hooks/useLazyRef'
import { useLocation, useLocationPermission } from '@/hooks/useLocation'
import { Redirect, Stack } from 'expo-router'
import { AnimatePresence, ScrollView, Sheet, Spinner, useSheetController, XStack, YStack } from 'tamagui'
import { useDebounce } from 'use-debounce'

MapboxGl.setAccessToken(clientEnv.MAP_BOX_ACCESS_TOKEN)

const createSource = (actions: RestAction[]): MapboxGl.ShapeSource['props']['shape'] => {
  return {
    type: 'FeatureCollection',
    features: actions.map((action) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [action.post_address.longitude, action.post_address.latitude],
        },
        properties: {
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

function Page() {
  useLocationPermission()
  const {
    data: { coords },
  } = useLocation()
  const data = useSuspensePaginatedActions(coords)

  const flattedActions = data.data?.pages.flatMap((page) => page.items) ?? []
  const source = createSource(flattedActions)

  return (
    <YStack gap="$4" flex={1} flexDirection="column">
      <MapboxGl.MapView styleURL="mapbox://styles/larem/clwaph1m1008501pg1cspgbj2" style={{ flex: 1 }}>
        <MapboxGl.Camera followUserLocation followUserMode={MapboxGl.UserTrackingMode.Follow} followZoomLevel={14} />
        <MapboxGl.UserLocation visible />
        <MapboxGl.ShapeSource id="actions" shape={source} clusterMaxZoomLevel={18} cluster={false} clusterRadius={35}>
          <MapboxGl.CircleLayer
            id="layer-action"
            // filter={['==', ['get', 'type'], 'pap']}
            style={{
              circleRadius: 15,
              circleColor: 'black',
              circleStrokeWidth: 2,
            }}
          />
        </MapboxGl.ShapeSource>
      </MapboxGl.MapView>
      <BottomSheetList actions={flattedActions} query={data} />
    </YStack>
  )
}

type ActionListProps = {
  actions: RestAction[]
  query: ReturnType<typeof useSuspensePaginatedActions>
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

const BottomSheetList = (props: ActionListProps) => {
  const [position, setPosition] = React.useState(2)
  const handlePositionChange = (position: number) => {
    setPosition(position)
  }

  const pageMode = position === 0

  const loadMore = () => {
    if (props.query.hasNextPage) {
      props.query.fetchNextPage()
    }
  }
  return (
    <Sheet
      native
      defaultOpen={true}
      defaultPosition={2}
      position={position}
      dismissOnOverlayPress={false}
      onPositionChange={handlePositionChange}
      snapPoints={['100%', '80%', 130]}
      snapPointsMode="mixed"
    >
      <Sheet.Frame borderTopLeftRadius={pageMode ? 0 : 10} borderTopRightRadius={pageMode ? 0 : 10}>
        <Sheet.Handle backgroundColor="$textDisabled" mt="$3.5" mb="$0" height={3} width={50} alignSelf="center" />
        <XStack justifyContent="center" p="$3">
          <Text fontWeight={'$6'} color="$textDisabled" textAlign="center">
            Toutes les actions
          </Text>
        </XStack>
        <YStack gap="$3" height={70}>
          <Sheet.ScrollView horizontal flex={1} contentContainerStyle={{ p: '$3' }}>
            <XStack gap="$3">
              <Select options={[]} placeholder="Cette semaine" />
              <Select options={[]} placeholder="Cette semaine" />
              <Select options={[]} placeholder="Cette semaine" />
            </XStack>
          </Sheet.ScrollView>
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
          <ActionList {...props} />
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  )
}
