import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ListPickerModalNavigatorScreenProps } from "../../navigation/listPickerModal/ListPickerModalNavigatorScreenProps";
import { filterItemsForQuery } from "./filter.service";
import { ListPickerItem } from "./ListPickerItem";

export const useListPickerScreen = (
  items: ListPickerItem[],
  onItemSelected?: (id: string) => void,
): {
  displayedItems: ListPickerItem[];
  onSelectItem: (id: string) => void;
  onChangeText: (value: string) => void;
} => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedItems, setDisplayedItems] = useState(items);

  const navigation =
    useNavigation<ListPickerModalNavigatorScreenProps<"ListPicker">["navigation"]>();

  useEffect(() => {
    if (searchTerm.length === 0) {
      setDisplayedItems(items);
    } else {
      const newItems = filterItemsForQuery(items, "value", searchTerm);
      setDisplayedItems(newItems);
    }
  }, [searchTerm, items]);

  const onSelectItem = (id: string) => {
    onItemSelected?.(id);
    navigation.goBack();
  };

  const onChangeText = (value: string) => {
    setSearchTerm(value);
  };

  return { displayedItems, onSelectItem, onChangeText };
};
