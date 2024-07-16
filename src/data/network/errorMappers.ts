import { formErrorThrower } from '@/services/errors/form-errors'
import { isAxiosError } from 'axios'
import { FormViolation } from '../../core/entities/DetailedProfile'
import {
  EventSubscriptionError,
  PhonePollAlreadyAnsweredError,
  PhoningSessionFinishedCampaignError,
  PhoningSessionNoNumberError,
  ProfileFormError,
  PublicSubscribeEventFormError,
  TokenCannotBeSubscribedError,
} from '../../core/errors'
import { RestSubscriptionErrorResponse } from '../restObjects/RestEvents'
import { RestLoginErrorResponse } from '../restObjects/RestLoginErrorResponse'
import { RestPhoningSessionErrorResponse } from '../restObjects/RestPhoningSession'
import { RestUpdateErrorResponse } from '../restObjects/RestUpdateProfileRequest'
import { LoginError } from './../../core/errors/index'
import { genericErrorMapping } from './utils'

export const mapLoginError = async (error: unknown) => {
  if (isAxiosError(error) && error.status === 400) {
    const errorResponse = error?.response?.data

    const parsedError = errorResponse as RestLoginErrorResponse
    throw new LoginError(parsedError.message)
  }
  return genericErrorMapping(error)
}

export const mapProfileFormError = async (error: unknown) => {
  formErrorThrower(error, ProfileFormError)
  return genericErrorMapping(error)
}

export const mapPublicSubcribeFormError = async (error: unknown) => {
  formErrorThrower(error, PublicSubscribeEventFormError)
  return genericErrorMapping(error)
}

export const mapSubscriptionError = async (error: any) => {
  if (isAxiosError(error) && error.status === 400) {
    const errorResponse = error?.response?.data

    const parsedError = errorResponse as RestSubscriptionErrorResponse
    const errorMessage = parsedError.violations.reduce((previousValue, currentValue) => {
      let prefix: string
      if (previousValue === '') {
        prefix = ''
      } else {
        prefix = '\n'
      }
      return previousValue + prefix + currentValue.title
    }, '')
    throw new EventSubscriptionError(errorMessage)
  }
  return genericErrorMapping(error)
}

export const mapAssociatedToken = async (error: any) => {
  if (isAxiosError(error) && error.status === 400) {
    const errorResponse = error?.response?.data

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

export const mapPhoningSessionError = async (error: unknown) => {
  if (isAxiosError(error) && error.status === 400) {
    const errorResponse = error?.response?.data
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

export const mapPhonePollError = async (error: unknown) => {
  if (isAxiosError(error) && error.status === 400) {
    const errorResponse = error?.response?.data
    const parsedError = errorResponse as RestPhoningSessionErrorResponse
    switch (parsedError.code) {
      case 'already_replied':
        throw new PhonePollAlreadyAnsweredError(parsedError.message)
    }
  }
  return genericErrorMapping(error)
}
