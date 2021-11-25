export type ClusterType = {
  id: number
  clusterColor: string
  clusterFontFamily: string
  clusterTextColor: string
  geometry: {
    coordinates: number[]
    type: string
  }
  onPress: () => void
  properties: {
    cluster: boolean
    cluster_id: number
    point_count: number
    point_count_abbreviated: number
  }
  type: string
}

export type DoorToDoorAddress = {
  number: string
  address: string
  inseeCode: string
  cityName: string
  latitude: number
  longitude: number
  building: any
  id: string
  formattedAddress: string
}
