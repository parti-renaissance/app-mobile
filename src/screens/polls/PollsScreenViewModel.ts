import { PollRowViewModel } from "./PollRowViewModel";
import { PollsHeaderViewModel } from "./PollsHeaderViewModel";

export interface PollsScreenViewModel {
  header: PollsHeaderViewModel;
  rows: Array<PollRowViewModel>;
}
