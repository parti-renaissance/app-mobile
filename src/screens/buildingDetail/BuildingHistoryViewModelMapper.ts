import { Moment } from 'moment-timezone'
import { BuildingHistoryPoint } from './../../core/entities/BuildingHistory'
import { KeyValueListViewModel } from './KeyValueListView'
import {
  BuildingHistoryViewModel,
  BuildingVisitsDateRecordsViewModel,
  BuildingVisitsHistoryViewModel,
  DateViewModel,
} from './BuildingVisitsHistoryViewModel'
import { KeyValueCellViewModel } from './KeyValueCell'
import i18n from '../../utils/i18n'

export const BuildingHistoryViewModelMapper = {
  map: (history: BuildingHistoryPoint[]): BuildingHistoryViewModel => {
    const buildingsMap = groupByBuilding(history)
    var buildingsViewModel: BuildingVisitsHistoryViewModel[] = []
    buildingsMap.forEach((buildingHistory, buildingName) => {
      var dateRecords: BuildingVisitsDateRecordsViewModel[] = []
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

function dateViewModel(date: Moment): DateViewModel {
  return {
    dayNumber: date.format('DD'),
    dateContext: date.format('MMM YYYY'),
  }
}

function dateRecordsViewModel(
  date: Moment,
  history: BuildingHistoryPoint[],
): BuildingVisitsDateRecordsViewModel {
  const doorVisit = history.map(doorVisitViewModel)
  const visitRecords: KeyValueListViewModel = {
    cells: doorVisit,
    footnote: footnote(history),
  }
  return {
    date: dateViewModel(date),
    visitRecords: visitRecords,
  }
}

function footnote(history: BuildingHistoryPoint[]): string {
  var questionersSet: Set<string> = new Set()
  history.forEach((historyPoint) => {
    questionersSet.add(historyPoint.questioner)
  })
  var questioners: string[] = Array.from(questionersSet)
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
    key: i18n.t('building.history.visitFormat', {
      floor: historyPoint.floor,
      door: historyPoint.door,
    }),
    value: historyPoint.status,
  }
}

function groupByBuilding(
  history: BuildingHistoryPoint[],
): Map<string, BuildingHistoryPoint[]> {
  var buildingMap = new Map<string, BuildingHistoryPoint[]>()
  history.forEach((historyPoint) => {
    var pointsForBuilding = buildingMap.get(historyPoint.buildingBlock) ?? []
    pointsForBuilding.push(historyPoint)
    buildingMap.set(historyPoint.buildingBlock, pointsForBuilding)
  })
  return buildingMap
}

function groupByDate(
  history: BuildingHistoryPoint[],
): Map<string, BuildingHistoryPoint[]> {
  var buildingMap = new Map<string, BuildingHistoryPoint[]>()
  history.forEach((historyPoint) => {
    const date = historyPoint.createdAt.format('YYYY-MM-DD')
    var pointsForBuilding = buildingMap.get(date) ?? []
    pointsForBuilding.push(historyPoint)
    buildingMap.set(date, pointsForBuilding)
  })
  return buildingMap
}
