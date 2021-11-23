export type DisplayMode = 'map' | 'list'
export type DisplayFilter = 'all' | 'todo' | 'tofinish' | 'finished'

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

export type AddressType = {
  number: string
  address: string
  insee_code: string
  city_name: string
  latitude: number
  longitude: number
  building: any
  uuid: string
}
