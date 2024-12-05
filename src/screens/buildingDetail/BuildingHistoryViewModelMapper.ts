import { format } from 'date-fns'
import i18n from '../../utils/i18n'
import { BuildingHistoryPoint } from './../../core/entities/BuildingHistory'
import {
  BuildingHistoryViewModel,
  BuildingVisitsDateRecordsViewModel,
  BuildingVisitsHistoryViewModel,
  DateViewModel,
} from './BuildingVisitsHistoryViewModel'
import { KeyValueCellViewModel } from './KeyValueCell'
import { KeyValueListViewModel } from './KeyValueListView'

export const BuildingHistoryViewModelMapper = {
  map: (history: BuildingHistoryPoint[]): BuildingHistoryViewModel => {
    const buildingsMap = groupByBuilding(history)
    const buildingsViewModel: BuildingVisitsHistoryViewModel[] = []
    buildingsMap.forEach((buildingHistory, buildingName) => {
      const dateRecords: BuildingVisitsDateRecordsViewModel[] = []
      groupByDate(buildingHistory).forEach((visits) => {
        const date = visits[0].createdAt
        dateRecords.push(dateRecordsViewModel(date, visits))
      })
      buildingsViewModel.push(
        buildingVisitsHistoryVieModel(buildingName, dateRecords),
      )
    })
    return {
      buildings: buildingsViewModel,
    }
  },
}

function buildingVisitsHistoryVieModel(
  buildingName: string,
  dateRecords: BuildingVisitsDateRecordsViewModel[],
): BuildingVisitsHistoryViewModel {
  return {
    buildingName: i18n.t('building.history.buldingblockFormat', {
      buildingName: buildingName,
    }),
    dateRecords: dateRecords,
  }
}

function dateViewModel(date: Date): DateViewModel {
  return {
    dayNumber: format(date, 'dd'),
    dateContext: format(date, 'MMM yyyy'),
  }
}

function dateRecordsViewModel(
  date: Date,
  history: BuildingHistoryPoint[],
): BuildingVisitsDateRecordsViewModel {
  const doorVisit = history.map(doorVisitViewModel)
  const visitRecords: KeyValueListViewModel = {
    cells: doorVisit,
    footnote: footnote(history),
  }
  return {
    key: date.toISOString(),
    date: dateViewModel(date),
    visitRecords: visitRecords,
  }
}

function footnote(history: BuildingHistoryPoint[]): string {
  const questionersSet: Set<string> = new Set()
  history.forEach((historyPoint) => {
    questionersSet.add(historyPoint.questioner)
  })
  const questioners: string[] = Array.from(questionersSet)
  if (questioners.length > 1) {
    const last = questioners.pop()
    const beforeLast = questioners.pop()
    const concatenated =
      beforeLast +
      i18n.t('building.history.questionersListLastSeparator') +
      last
    questioners.push(concatenated)
  }
  return i18n.t('building.history.questionersFormat', {
    questioners: questioners.join(
      i18n.t('building.history.questionersListSeparator'),
    ),
  })
}

function doorVisitViewModel(
  historyPoint: BuildingHistoryPoint,
): KeyValueCellViewModel {
  return {
    id: historyPoint.createdAt.toISOString(),
    key: i18n.t('building.history.visitFormat', {
      count: historyPoint.floor + 1,
      floor: historyPoint.floor,
      door: historyPoint.door,
    }),
    value: historyPoint.status,
  }
}

function groupByBuilding(
  history: BuildingHistoryPoint[],
): Map<string, BuildingHistoryPoint[]> {
  const buildingMap = new Map<string, BuildingHistoryPoint[]>()
  history.forEach((historyPoint) => {
    const pointsForBuilding = buildingMap.get(historyPoint.buildingBlock) ?? []
    pointsForBuilding.push(historyPoint)
    buildingMap.set(historyPoint.buildingBlock, pointsForBuilding)
  })
  return buildingMap
}

function groupByDate(
  history: BuildingHistoryPoint[],
): Map<string, BuildingHistoryPoint[]> {
  const buildingMap = new Map<string, BuildingHistoryPoint[]>()
  history.forEach((historyPoint) => {
    const date = format(historyPoint.createdAt, 'yyyy-MM-dd')
    const pointsForBuilding = buildingMap.get(date) ?? []
    pointsForBuilding.push(historyPoint)
    buildingMap.set(date, pointsForBuilding)
  })
  return buildingMap
}
