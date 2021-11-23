import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { AddressType } from '../../core/entities/DoorToDoor'
import { Spacing } from '../../styles'
import { PoiAddressCard } from './PoiAddressCard'

type Props = {
  data: AddressType[]
}

const DoorToDoorListView = ({ data }: Props) => {
  const Separator = () => {
    return <View style={styles.separator} />
  }

  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={({ item }) => <PoiAddressCard poi={item} />}
      keyExtractor={(item) => item.uuid.toString()}
      ItemSeparatorComponent={Separator}
      nestedScrollEnabled={true}
    />
  )
}
const styles = StyleSheet.create({
  container: {
    padding: Spacing.margin,
  },
  separator: {
    height: Spacing.margin,
  },
})

export default DoorToDoorListView
