import _httpClient from './HttpClient'
import { Poll } from '../../core/entities/Poll'
import { RestPollResultRequest } from '../restObjects/RestPollResultRequest'
import { RestProfileResponse } from '../restObjects/RestProfileResponse'
import { genericErrorMapping } from './utils'
import { RestNewsResponse } from '../restObjects/RestNewsResponse'
import { RestDepartmentResponse } from '../restObjects/RestDepartmentResponse'
import { Options } from 'ky'
import {
  RestQuickPollItem,
  RestQuickPollResponse,
} from '../restObjects/RestQuickPollResponse'
import { RestDetailedProfileResponse } from '../restObjects/RestDetailedProfileResponse'
import { RestUpdateProfileRequest } from '../restObjects/RestUpdateProfileRequest'

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
      .catch(genericErrorMapping)
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

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }
}

export default ApiService
