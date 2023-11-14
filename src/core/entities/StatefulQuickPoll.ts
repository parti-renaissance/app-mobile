import { QuickPoll } from './QuickPoll'

export interface StatefulQuickPoll extends QuickPoll {
  state: 'answered' | 'pending'
}
