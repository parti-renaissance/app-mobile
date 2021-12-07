import {
  BuildingHistoryViewModel,
  BuildingVisitsDateRecordsViewModel,
  BuildingVisitsHistoryViewModel,
  DateViewModel,
  VisitRecordsViewModel,
  VisitRecordViewModel,
} from './BuildingVisitsHistoryViewModel'

export const BuildingVisitsHistoryViewModelMapper = {
  map: (): BuildingHistoryViewModel => {
    // 2021/12/07 (Denis Poifol) Replace stubs with actual data
    const doorVisit: VisitRecordViewModel[] = [
      {
        door: 'Etage 1 - Porte 1',
        status: 'Absent',
      },
      {
        door: 'Etage 1 - Porte 2',
        status: 'Indisponible',
      },
      {
        door: 'Etage 1 - Porte 3',
        status: 'Interrogé',
      },
      {
        door: 'Etage 1 - Porte 4',
        status: 'Absent',
      },
      {
        door: 'Etage 1 - Porte 5',
        status: 'Refus',
      },
      {
        door: 'Etage 1 - Porte 6',
        status: 'Refus',
      },
      {
        door: 'Etage 2 - Porte 1',
        status: 'Absent',
      },
      {
        door: 'Etage 2 - Porte 2',
        status: 'Refus',
      },
      {
        door: 'Etage 2 - Porte 3',
        status: 'Interrogé',
      },
      {
        door: 'Etage 2 - Porte 4',
        status: 'Refus',
      },
      {
        door: 'Etage 2 - Porte 5',
        status: 'Absent',
      },
      {
        door: 'Etage 2 - Porte 6',
        status: 'Indisponible',
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
