import React from 'react'
import { FlatList } from 'react-native'
import { AddressType } from '../../core/entities/DoorToDoor'
import { PoiAddressCard } from './PoiAddressCard'

type Props = {
  data: AddressType[]
}

const DoorToDoorListView = ({ data }: Props) => (
  <FlatList
    data={data}
    renderItem={({ item }) => <PoiAddressCard poi={item} />}
    keyExtractor={(item) => item.uuid.toString()}
    nestedScrollEnabled={true}
  />
)

export default DoorToDoorListView
