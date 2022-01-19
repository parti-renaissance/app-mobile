import { LoginError, SignUpFormError } from './../../core/errors/index'
import { HTTPError } from 'ky'
import { FormViolation } from '../../core/entities/DetailedProfile'
import {
  EventSubscriptionError,
  PhonePollAlreadyAnsweredError,
  PhoningSessionFinishedCampaignError,
  PhoningSessionNoNumberError,
  ProfileFormError,
  TokenCannotBeSubscribedError,
} from '../../core/errors'
import { RestSubscriptionErrorResponse } from '../restObjects/RestEvents'
import { RestLoginErrorResponse } from '../restObjects/RestLoginErrorResponse'
import { RestPhoningSessionErrorResponse } from '../restObjects/RestPhoningSession'
import { RestUpdateErrorResponse } from '../restObjects/RestUpdateProfileRequest'
import { genericErrorMapping } from './utils'
import { RestSignUpErrorResponse } from '../restObjects/RestSignUpRequest'

export const mapLoginError = async (error: any) => {
  if (error instanceof HTTPError && error.response.status === 400) {
    const errorResponse = await error.response.json()

    const parsedError = errorResponse as RestLoginErrorResponse
    throw new LoginError(parsedError.message)
  }
  return genericErrorMapping(error)
}

export const mapProfileFormError = async (error: any) => {
  if (error instanceof HTTPError && error.response.status === 400) {
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
  if (error instanceof HTTPError && error.response.status === 400) {
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
  if (error instanceof HTTPError && error.response.status === 400) {
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

export const mapPhoningSessionError = async (error: any) => {
  if (error instanceof HTTPError && error.response.status === 400) {
    const errorResponse = await error.response.json()
    const parsedError = errorResponse as RestPhoningSessionErrorResponse
    switch (parsedError.code) {
      case 'no_available_number':
        throw new PhoningSessionNoNumberError(parsedError.message)
      case 'finished_campaign':
        throw new PhoningSessionFinishedCampaignError(parsedError.message)
    }
  }
  return genericErrorMapping(error)
}

export const mapPhonePollError = async (error: any) => {
  if (error instanceof HTTPError && error.response.status === 400) {
    const errorResponse = await error.response.json()
    const parsedError = errorResponse as RestPhoningSessionErrorResponse
    switch (parsedError.code) {
      case 'already_replied':
        throw new PhonePollAlreadyAnsweredError(parsedError.message)
    }
  }
  return genericErrorMapping(error)
}

export const mapSignUpFormError = async (error: any) => {
  if (error instanceof HTTPError && error.response.status === 400) {
    const errorResponse = await error.response.json()

    const parsedError = errorResponse as RestSignUpErrorResponse
    const violations = parsedError.violations.map<FormViolation>((value) => {
      return {
        propertyPath: value.propertyPath,
        message: value.title,
      }
    })
    throw new SignUpFormError(violations)
  }
  return genericErrorMapping(error)
}
