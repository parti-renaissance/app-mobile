import React from "react";
import { FlatList } from "react-native";
import { DoorToDoorAddress } from "../../core/entities/DoorToDoor";
import { PoiAddressCard } from "./PoiAddressCard";
import { PoiAddressCardViewModelMapper } from "./PoiAddressCardViewModelMapper";

type Props = {
  data: DoorToDoorAddress[];
  onAddressPress: (id: string) => void;
};

const DoorToDoorListView = ({ data, onAddressPress }: Props) => (
  <FlatList
    data={data}
    renderItem={({ item }) => {
      return (
        <PoiAddressCard
          viewModel={PoiAddressCardViewModelMapper.map(item)}
          onPress={onAddressPress}
        />
      );
    }}
    keyExtractor={(item) => item.id.toString()}
  />
);

export default DoorToDoorListView;
