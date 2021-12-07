import { KeyValueCellViewModel } from './KeyValueCell'
export interface BuildingHistoryViewModel {
  buildings: BuildingVisitsHistoryViewModel[]
}

export interface BuildingVisitsHistoryViewModel {
  buildingName: string
  dateRecords: BuildingVisitsDateRecordsViewModel[]
}

export interface BuildingVisitsDateRecordsViewModel {
  date: DateViewModel
  visitRecords: VisitRecordsViewModel
}

export interface DateViewModel {
  dayNumber: string
  dateContext: string
}

export interface VisitRecordsViewModel {
  doorVisit: KeyValueCellViewModel[]
  visitors: string
}
