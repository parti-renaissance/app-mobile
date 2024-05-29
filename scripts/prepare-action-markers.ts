import fs from 'fs'
import path from 'path'
import { ActionType } from '../src/data/restObjects/RestActions'

const actionTypes = Object.values(ActionType)
const tspath = '@/assets/images/actionMap/'
const buildRequireByName = (type: ActionType) => `require('${tspath}${type}-marker.png')`

const jsOJectEntries = actionTypes.reduce((acc, type) => {
  acc += `${type}: ${buildRequireByName(type)},\n`
  return acc
}, '')

const jsObject = `export default {
    ${jsOJectEntries}
} as const`

const outputMarkers = path.join(__dirname, '../assets/images/generated-markers-lib.ts')
fs.writeFileSync(outputMarkers, jsObject, 'utf-8')
