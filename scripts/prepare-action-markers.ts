import fs from 'fs'
import path from 'path'
import { ActionType, RestActionType } from '../src/data/restObjects/RestActions'

type MarkersName = ActionType | `${ActionType}Active`
const buildActiveMarker = (type: ActionType) => `${type}Active` as const

const actionTypes = Object.values(ActionType)
const allMarkers = [...actionTypes, ...actionTypes.map(buildActiveMarker)]
const tspath = '@/assets/images/actionMap/'
const buildRequireByName = (type: MarkersName) => `require('${tspath}${type}-marker.png')`

const jsOJectEntries = allMarkers.reduce((acc, type) => {
  acc += `${type}: ${buildRequireByName(type)},\n`
  return acc
}, '')

const jsObject = `export default {
    ${jsOJectEntries}
} as const`

const outputMarkers = path.join(__dirname, '../assets/images/generated-markers-lib.ts')
fs.writeFileSync(outputMarkers, jsObject, 'utf-8')
