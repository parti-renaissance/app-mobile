import fs from 'fs'
import path from 'path'
import { flow } from 'fp-ts/lib/function'
import { ActionType } from '../src/services/actions/schema'

type MarkerSuffix = 'passed' | 'cancelled'
type MarkerState = ActionType | `${ActionType}Active`
type MarkersName = MarkerState | `${MarkerState}-${MarkerSuffix}`

const buildActiveMarker = (type: ActionType) => `${type}Active` as const
const buildPassedMarker = (type: MarkerState) => `${type}-passed` as const
const buildCancelledMarker = (type: MarkerState) => `${type}-cancelled` as const

const actionTypes = Object.values(ActionType)
const allMarkers = [
  ...actionTypes,
  ...actionTypes.map(buildActiveMarker),
  ...actionTypes.map(buildPassedMarker),
  ...actionTypes.map(flow(buildActiveMarker, buildPassedMarker)),
  ...actionTypes.map(buildCancelledMarker),
  ...actionTypes.map(flow(buildActiveMarker, buildCancelledMarker)),
]
const tspath = '@/assets/images/actionMap/'
const buildRequireByName = (type: MarkersName) => `require('${tspath}${type}-marker.png')`

const jsOJectEntries = allMarkers.reduce((acc, type) => {
  acc += `'${type}': ${buildRequireByName(type)},\n`
  return acc
}, '')

const jsObject = `export default {
    ${jsOJectEntries}
} as const`

const outputMarkers = path.join(__dirname, '../assets/images/generated-markers-lib.ts')
fs.writeFileSync(outputMarkers, jsObject, 'utf-8')
