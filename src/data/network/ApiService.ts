import _httpClient from './HttpClient'
import { Poll } from '../../core/entities/Poll'
import { RestPollResultRequest } from '../restObjects/RestPollResultRequest'
import { RestProfileResponse } from '../restObjects/RestProfileResponse'
import { genericErrorMapping } from './utils'
import { RestNewsResponse } from '../restObjects/RestNewsResponse'
import { RestDepartmentResponse } from '../restObjects/RestDepartmentResponse'
import { RestQuickPollItem } from '../restObjects/RestQuickPollResponse'
import { Options } from 'ky'
import { RestDetailedProfileResponse } from '../restObjects/RestDetailedProfileResponse'
import {
  RestPostPushTokenRequest,
  RestUpdateCentersOfInterestRequest,
  RestUpdateProfileRequest,
  RestUpdateSubscriptionsRequest,
} from '../restObjects/RestUpdateProfileRequest'
import { RestDetailedEvent, RestEvents } from '../restObjects/RestEvents'
import { EventFilters } from '../../core/entities/Event'
import { RestConfigurations } from '../restObjects/RestConfigurations'
import { SearchParamsKeyValue } from './SearchParams'
import { GetEventsSearchParametersMapper } from '../mapper/GetEventsSearchParametersMapper'
import {
  mapAssociatedToken,
  mapProfileFormError,
  mapSubscriptionError,
} from './errorMappers'

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
      .catch(mapProfileFormError)
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

  public getQuickPolls(zipCode: string): Promise<RestQuickPollItem> {
    return this.httpClient
      .get('api/v3/polls/' + zipCode)
      .json<RestQuickPollItem>()
      .catch(genericErrorMapping)
  }

  public sendQuickPollAnswer(answerId: string): Promise<RestQuickPollItem> {
    return this.httpClient
      .post('api/v3/polls/vote', { json: { uuid: answerId } })
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
    orderBySubscriptions?: boolean,
  ): Promise<RestEvents> {
    const filterParams: SearchParamsKeyValue = GetEventsSearchParametersMapper.map(
      eventFilters,
    )
    let searchParams: SearchParamsKeyValue = {
      page: page,
      zipCode: zipCode,
      ...filterParams,
    }
    if (orderBySubscriptions) {
      searchParams = {
        'order[subscriptions]': 'desc',
        ...searchParams,
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
      .catch(mapSubscriptionError)
  }

  public unsubscribeFromEvent(eventId: string): Promise<void> {
    return this.httpClient
      .delete('api/v3/events/' + eventId + '/subscribe')
      .json()
      .then(() => {})
      .catch(mapSubscriptionError)
  }

  public async getProfileAvailableConfiguration(): Promise<RestConfigurations> {
    return this.httpClient
      .get('api/v3/profile/configuration')
      .json<RestConfigurations>()
      .catch(genericErrorMapping)
  }

  public updateCentersOfInterest(
    userUuid: string,
    request: RestUpdateCentersOfInterestRequest,
  ): Promise<void> {
    return this.httpClient
      .put('api/v3/profile/' + userUuid, { json: request })
      .json()
      .then(() => {})
      .catch(genericErrorMapping)
  }

  public updateSubscriptions(
    userUuid: string,
    request: RestUpdateSubscriptionsRequest,
  ): Promise<void> {
    return this.httpClient
      .put('api/v3/profile/' + userUuid, { json: request })
      .json()
      .then(() => {})
      .catch(genericErrorMapping)
  }

  public addPushToken(request: RestPostPushTokenRequest): Promise<void> {
    return this.httpClient
      .post('api/v3/push-token', { json: request })
      .json()
      .then(() => {})
      .catch(mapAssociatedToken)
  }

  public removePushToken(pushToken: string): Promise<void> {
    return this.httpClient
      .delete('api/v3/push-token/' + pushToken)
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

export default ApiService
