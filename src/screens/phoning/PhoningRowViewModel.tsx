import { PhoningCallContactRowViewModel } from './callContact/CallContactRow'
import { PhoningTutorialRowViewModel } from './tutorial/PhoningTutorialRow'

export type PhoningRowViewModel =
  | {
      type: 'tutorial'
      value: PhoningTutorialRowViewModel
    }
  | {
      type: 'callContact'
      value: PhoningCallContactRowViewModel
    }
