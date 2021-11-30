import { ImageSourcePropType } from 'react-native'
import { StatBlockViewModel } from './StatBlockViewModel'

export interface BuildingStatusViewModel {
  statusTile: string
  statusIcon: ImageSourcePropType
  encounteredElectorsStatBlock: StatBlockViewModel
  doorKnockedStatBlock: StatBlockViewModel
  completedQuestionnairesStatBlock: StatBlockViewModel
}
