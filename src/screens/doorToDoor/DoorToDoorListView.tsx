import React from 'react'
import { FlatList } from 'react-native'
import { DoorToDoorAddress } from '../../core/entities/DoorToDoor'
import { PoiAddressCard } from './PoiAddressCard'

type Props = {
  data: DoorToDoorAddress[]
}

const DoorToDoorListView = ({ data }: Props) => (
  <FlatList
    data={data}
    renderItem={({ item }) => <PoiAddressCard poi={item} />}
    keyExtractor={(item) => item.id.toString()}
  />
)

export default DoorToDoorListView
