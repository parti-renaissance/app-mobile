import { genericErrorThrower } from '@/services/common/errors/generic-errors'

const genericErrorMapping = (x: unknown) => {
  genericErrorThrower(x)
  throw x
}
export { genericErrorMapping }
