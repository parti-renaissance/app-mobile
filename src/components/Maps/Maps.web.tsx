import { MapMarkerProps, MapPolylineProps, MapViewProps, type LatLng, type Region } from 'react-native-maps'

const MapView = (_: MapViewProps) => <div />
const Marker = (_: MapMarkerProps) => <div />
const Polyline = (_: MapPolylineProps) => <div />
const Region = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0,
  longitudeDelta: 0,
} satisfies Region

const LatLng = {
  latitude: 0,
  longitude: 0,
} satisfies LatLng

const PROVIDER_GOOGLE = 'google'

export default MapView
export { Marker, Polyline, PROVIDER_GOOGLE, Region, LatLng }
