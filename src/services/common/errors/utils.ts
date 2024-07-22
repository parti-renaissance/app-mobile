import { genericErrorThrower } from './generic-errors'
import { ErrorThrower } from './types'

export const parseError = (error: unknown, throwers: Array<ErrorThrower> = []) => {
  ;[...throwers, genericErrorThrower].reduce((acc, thrower) => thrower(acc), error)
  throw error instanceof Error ? error : new Error('Unknown error')
}
