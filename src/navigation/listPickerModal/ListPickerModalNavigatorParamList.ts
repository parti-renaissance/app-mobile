import { ListPickerItem } from "../../screens/listPicker/ListPickerItem";

export type ListPickerModalNavigatorParamList = {
  ListPicker: {
    title: string;
    items: ListPickerItem[];
    selectedItemId?: string;
    onItemSelected?: (id: string) => void;
    displaySearch?: boolean;
    presentationType?: "push" | "modal";
  };
};
