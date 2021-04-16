import _httpClient from './HttpClient'
import { Poll } from '../../core/entities/Poll'
import { RestPollResultRequest } from '../restObjects/RestPollResultRequest'
import { RestProfileResponse } from '../restObjects/RestProfileResponse'
import { genericErrorMapping } from './utils'
import { RestNewsResponse } from '../restObjects/RestNewsResponse'
import { RestDepartmentResponse } from '../restObjects/RestDepartmentResponse'
import {
  RestQuickPollItem,
  RestQuickPollResponse,
} from '../restObjects/RestQuickPollResponse'
import ky, { Options } from 'ky'
import { RestDetailedProfileResponse } from '../restObjects/RestDetailedProfileResponse'
import {
  RestUpdateErrorResponse,
  RestUpdateProfileRequest,
} from '../restObjects/RestUpdateProfileRequest'
import { ProfileFormError } from '../../core/errors'
import { FormViolation } from '../../core/entities/DetailedProfile'
import { RestDetailedEvent, RestEvents } from '../restObjects/RestEvents'
import { EventFilters } from '../../core/entities/Event'

class ApiService {
  private static instance: ApiService
  private httpClient = _httpClient
  private constructor() {}

  public getPolls(zipCode?: string): Promise<Array<Poll>> {
    const options: Options | undefined = zipCode
      ? { searchParams: { postalCode: zipCode } }
      : undefined
    return this.httpClient
      .get('api/jecoute/survey', options)
      .json<Array<Poll>>()
      .catch(genericErrorMapping)
  }

  public sendPollAnswers(request: RestPollResultRequest): Promise<void> {
    return this.httpClient
      .post('api/jecoute/survey/reply', { json: request })
      .json()
      .then(() => {})
      .catch(genericErrorMapping)
  }

  public getProfile(): Promise<RestProfileResponse> {
    return this.httpClient
      .get('api/me')
      .json<RestProfileResponse>()
      .catch(genericErrorMapping)
  }

  public getDetailedProfile(): Promise<RestDetailedProfileResponse> {
    return this.httpClient
      .get('api/v3/profile/me')
      .json<RestDetailedProfileResponse>()
      .catch(genericErrorMapping)
  }

  public updateProfile(
    userUuid: string,
    request: RestUpdateProfileRequest,
  ): Promise<RestDetailedProfileResponse> {
    return this.httpClient
      .put('api/v3/profile/' + userUuid, { json: request })
      .json<RestDetailedProfileResponse>()
      .catch(async (error) => {
        if (error instanceof ky.HTTPError && error.response.status === 400) {
          const errorResponse = await error.response.json()

          const parsedError = errorResponse as RestUpdateErrorResponse
          const violations = parsedError.violations.map<FormViolation>(
            (value) => {
              return {
                propertyPath: value.propertyPath,
                message: value.message,
              }
            },
          )
          throw new ProfileFormError(violations)
        }
        return genericErrorMapping(error)
      })
  }

  public getNews(zipCode: string, page: number): Promise<RestNewsResponse> {
    return this.httpClient
      .get('api/jecoute/news', {
        searchParams: { zipCode: zipCode, page: page },
      })
      .json<RestNewsResponse>()
      .catch(genericErrorMapping)
  }

  public async getDepartment(
    zipCode: string,
    accessToken?: string,
  ): Promise<RestDepartmentResponse> {
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {}
    return this.httpClient
      .get('api/jecoute/departments/' + zipCode, { headers: headers })
      .json<RestDepartmentResponse>()
      .catch(genericErrorMapping)
  }

  public getQuickPolls(): Promise<RestQuickPollResponse> {
    return this.httpClient
      .get('api/polls')
      .json<RestQuickPollResponse>()
      .catch(genericErrorMapping)
  }

  public sendQuickPollAnswer(answerId: string): Promise<RestQuickPollItem> {
    return this.httpClient
      .post('api/polls/vote', { json: { uuid: answerId } })
      .json<RestQuickPollItem>()
      .catch(genericErrorMapping)
  }

  public async getCityFromPostalCode(
    postalCode: string,
  ): Promise<string | undefined> {
    // Exclude accessToken injection on this route
    const headers = { Authorization: '' }
    const response = await this.httpClient
      .get('api/postal-code/' + postalCode, { headers: headers })
      .json()
      .catch(genericErrorMapping)
    const result = response as { [key: string]: string }
    const entries = Object.entries(result)
    if (entries.length > 0) {
      const [, value] = Object.entries(result)[0]
      return value
    } else {
      return undefined
    }
  }

  public getEvents(
    zipCode: string,
    page: number,
    eventFilters?: EventFilters,
  ): Promise<RestEvents> {
    const subscribedOnly = eventFilters?.subscribedOnly ? true : undefined
    let searchParams: SearchParams = {
      page: page,
      zipCode: zipCode,
    }
    if (subscribedOnly) {
      searchParams = {
        ...searchParams,
        subscribedOnly: true,
      }
    }
    if (eventFilters?.finishAfter) {
      searchParams = {
        ...searchParams,
        'finishAt[strictly_after]': eventFilters?.finishAfter,
      }
    }
    return this.httpClient
      .get('api/v3/events', {
        searchParams: searchParams,
      })
      .json<RestEvents>()
      .catch(genericErrorMapping)
  }

  public getEventDetails(eventId: string): Promise<RestDetailedEvent> {
    return this.httpClient
      .get('api/v3/events/' + eventId)
      .json<RestDetailedEvent>()
      .catch(genericErrorMapping)
  }

  public subscribeToEvent(eventId: string): Promise<void> {
    return this.httpClient
      .post('api/v3/events/' + eventId + '/subscribe')
      .json()
      .then(() => {})
      .catch(genericErrorMapping)
  }

  public unsubscribeFromEvent(eventId: string): Promise<void> {
    return this.httpClient
      .delete('api/v3/events/' + eventId + '/subscribe')
      .json()
      .then(() => {})
      .catch(genericErrorMapping)
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }
}

type SearchParams =
  | string
  | { [key: string]: string | number | boolean }
  | Array<Array<string | number | boolean>>
  | URLSearchParams

export default ApiService
