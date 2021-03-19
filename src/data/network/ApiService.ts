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

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }
}

export default ApiService
