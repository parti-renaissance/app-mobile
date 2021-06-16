import ky from 'ky'
import { FormViolation } from '../../core/entities/DetailedProfile'
import {
  EventSubscriptionError,
  ProfileFormError,
  TokenCannotBeSubscribedError,
} from '../../core/errors'
import { RestSubscriptionErrorResponse } from '../restObjects/RestEvents'
import { RestUpdateErrorResponse } from '../restObjects/RestUpdateProfileRequest'
import { genericErrorMapping } from './utils'

export const mapProfileFormError = async (error: any) => {
  if (error instanceof ky.HTTPError && error.response.status === 400) {
    const errorResponse = await error.response.json()

    const parsedError = errorResponse as RestUpdateErrorResponse
    const violations = parsedError.violations.map<FormViolation>((value) => {
      return {
        propertyPath: value.propertyPath,
        message: value.message,
      }
    })
    throw new ProfileFormError(violations)
  }
  return genericErrorMapping(error)
}

export const mapSubscriptionError = async (error: any) => {
  if (error instanceof ky.HTTPError && error.response.status === 400) {
    const errorResponse = await error.response.json()

    const parsedError = errorResponse as RestSubscriptionErrorResponse
    const errorMessage = parsedError.violations.reduce(
      (previousValue, currentValue) => {
        let prefix
        if (previousValue === '') {
          prefix = ''
        } else {
          prefix = '\n'
        }
        return previousValue + prefix + currentValue.title
      },
      '',
    )
    throw new EventSubscriptionError(errorMessage)
  }
  return genericErrorMapping(error)
}

export const mapAssociatedToken = async (error: any) => {
  if (error instanceof ky.HTTPError && error.response.status === 400) {
    const errorResponse = await error.response.json()

    const parsedError = errorResponse as RestUpdateErrorResponse
    const violations = parsedError.violations.map<FormViolation>((value) => {
      return {
        propertyPath: value.propertyPath,
        message: value.message,
      }
    })
    const hasTokenError = violations.find((value) => {
      return value.propertyPath === 'identifier'
    })
    if (hasTokenError) {
      throw new TokenCannotBeSubscribedError()
    }
  }
  return genericErrorMapping(error)
}
