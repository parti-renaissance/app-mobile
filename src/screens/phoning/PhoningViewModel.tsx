import { PhoningRowViewModel } from "./PhoningRowViewModel";

export interface PhoningViewModel {
  title: string;
  rows: ReadonlyArray<PhoningRowViewModel>;
}
