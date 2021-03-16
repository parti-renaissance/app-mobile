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
    const mocked =
      '{\r\n        "uuid": "e6977a4d-2646-5f6c-9c82-88e58dca8458",\r\n        "email_address": "carl999@example.fr",\r\n        "first_name": "Carl",\r\n        "last_name": "Mirabeau",\r\n        "gender": "other",\r\n        "custom_gender": "Droid",\r\n        "nationality": "DE",\r\n        "post_address": {\r\n            "address": "122 rue de Mouxy",\r\n            "postal_code": "73100",\r\n            "city": "73100-73182",\r\n            "city_name": "Mouxy",\r\n            "region": null,\r\n            "country": "FR"\r\n        },\r\n        "phone": {\r\n          "country": "FR",\r\n          "number": "01 11 22 33 44"\r\n        },\r\n        "birthdate": "1950-07-08T00:00:00+01:00",\r\n        "facebook_page_url": null,\r\n        "twitter_page_url": null,\r\n        "linkedin_page_url": null,\r\n        "telegram_page_url": null,\r\n        "position": "retired",\r\n        "job": null,\r\n        "activity_area": null,\r\n        "subscription_types": [\r\n            {\r\n                "label": "Recevoir les e-mails nationaux",\r\n                "code": "subscribed_emails_movement_information"\r\n            },\r\n            {\r\n                "label": "Recevoir la newsletter hebdomadaire nationale",\r\n                "code": "subscribed_emails_weekly_letter"\r\n            },\r\n            {\r\n                "label": "Recevoir les e-mails de mes candidat(e)s LaREM",\r\n                "code": "candidate_email"\r\n            },\r\n            {\r\n                "label": "Recevoir les e-mails de mon/ma d\u00E9put\u00E9(e)",\r\n                "code": "deputy_email"\r\n            },\r\n            {\r\n                "label": "Recevoir les e-mails de mon/ma r\u00E9f\u00E9rent(e) territorial(e)",\r\n                "code": "subscribed_emails_referents"\r\n            },\r\n            {\r\n                "label": "Recevoir les e-mails de mon porteur de projet",\r\n                "code": "citizen_project_host_email"\r\n            },\r\n            {\r\n                "label": "Recevoir les e-mails de mon/ma s\u00E9nateur/trice",\r\n                "code": "senator_email"\r\n            }\r\n        ],\r\n        "interests": []\r\n    }'

    return Promise.resolve(JSON.parse(mocked))
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
