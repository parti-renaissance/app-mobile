import { genericErrorThrower } from '@/services/errors/generic-errors'

const genericErrorMapping = (x: unknown) => {
  genericErrorThrower(x)
  throw x
}
export { genericErrorMapping }
