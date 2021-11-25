import React from 'react'
import { FlatList } from 'react-native'
import { DoorToDoorAddress } from '../../core/entities/DoorToDoor'
import { PoiAddressCard } from './PoiAddressCard'
import { PoiAddressCardViewModelMapper } from './PoiAddressCardViewModelMapper'

type Props = {
  data: DoorToDoorAddress[]
}

const DoorToDoorListView = ({ data }: Props) => (
  <FlatList
    data={data}
    renderItem={({ item }) => {
      const viewModel = PoiAddressCardViewModelMapper.map(item)

      return <PoiAddressCard viewModel={viewModel} />
    }}
    keyExtractor={(item) => item.id.toString()}
  />
)

export default DoorToDoorListView
