import { SelectableIconLabelViewModel } from "../shared/SelectableIconLabelView";

export interface EventQuickFiltersViewModel {
  sections: Array<FilterSectionViewModel>;
}

export interface FilterSectionViewModel {
  id: string;
  title: string;
  data: Array<SelectableIconLabelViewModel>;
}
