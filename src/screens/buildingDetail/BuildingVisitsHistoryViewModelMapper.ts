import {
  BuildingHistoryViewModel,
  BuildingVisitsDateRecordsViewModel,
  BuildingVisitsHistoryViewModel,
  DateViewModel,
  VisitRecordsViewModel,
} from './BuildingVisitsHistoryViewModel'
import { KeyValueCellViewModel } from './KeyValueCell'

export const BuildingVisitsHistoryViewModelMapper = {
  map: (): BuildingHistoryViewModel => {
    // 2021/12/07 (Denis Poifol) Replace stubs with actual data
    const doorVisit: KeyValueCellViewModel[] = [
      {
        key: 'Etage 1 - Porte 1',
        value: 'Absent',
      },
      {
        key: 'Etage 1 - Porte 2',
        value: 'Indisponible',
      },
      {
        key: 'Etage 1 - Porte 3',
        value: 'Interrogé',
      },
      {
        key: 'Etage 1 - Porte 4',
        value: 'Absent',
      },
      {
        key: 'Etage 1 - Porte 5',
        value: 'Refus',
      },
      {
        key: 'Etage 1 - Porte 6',
        value: 'Refus',
      },
      {
        key: 'Etage 2 - Porte 1',
        value: 'Absent',
      },
      {
        key: 'Etage 2 - Porte 2',
        value: 'Refus',
      },
      {
        key: 'Etage 2 - Porte 3',
        value: 'Interrogé',
      },
      {
        key: 'Etage 2 - Porte 4',
        value: 'Refus',
      },
      {
        key: 'Etage 2 - Porte 5',
        value: 'Absent',
      },
      {
        key: 'Etage 2 - Porte 6',
        value: 'Indisponible',
      },
    ]
    const visitRecords: VisitRecordsViewModel = {
      doorVisit: doorVisit,
      visitors: 'Effectué par Donald P. et Alxandre M.',
    }
    const date: DateViewModel = {
      dayNumber: '23',
      dateContext: 'dec 2021',
    }
    const dateRecords: BuildingVisitsDateRecordsViewModel[] = [
      {
        date: date,
        visitRecords: visitRecords,
      },
      {
        date: date,
        visitRecords: visitRecords,
      },
    ]
    const buildings: BuildingVisitsHistoryViewModel[] = [
      {
        buildingName: 'Bâtiment A',
        dateRecords: dateRecords,
      },
      {
        buildingName: 'Bâtiment A',
        dateRecords: dateRecords,
      },
    ]
    return {
      buildings: buildings,
    }
  },
}
