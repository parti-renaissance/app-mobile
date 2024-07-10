import { SelectPeriod } from '@/components/actions'
import { Poll } from '@/core/entities/Poll'
import { addDays, endOfDay, startOfDay } from 'date-fns'
import { stringify } from 'qs'
import { GetEventsSearchParametersMapper, GetEventsSearchParametersMapperProps } from '../mapper/GetEventsSearchParametersMapper'
import { ActionCreateType, ActionFullSchema, ActionPaginationSchema, FilterActionType, RestActionRequestParams } from '../restObjects/RestActions'
import { RestBuildingEventRequest } from '../restObjects/RestBuildingEventRequest'
import { RestBuildingTypeRequest } from '../restObjects/RestBuildingTypeRequest'
import { RestConfigurations } from '../restObjects/RestConfigurations'
import { RestDepartmentResponse } from '../restObjects/RestDepartmentResponse'
import { RestDetailedProfileResponse } from '../restObjects/RestDetailedProfileResponse'
import { RestDoorToDoorAddress } from '../restObjects/RestDoorToDoorAddress'
import { RestDoorToDoorCampaign } from '../restObjects/RestDoorToDoorCampaign'
import { RestDoorToDoorCampaignHistoryResponse, RestDoorToDoorSurveyReplyResponse } from '../restObjects/RestDoorToDoorCampaignHistoryResponse'
import { RestDoorToDoorCampaignRanking } from '../restObjects/RestDoorToDoorCampaignRanking'
import {
  RestDoorToDoorCharter,
  RestDoorToDoorCharterAccepted,
  RestDoorToDoorCharterNotAccepted,
  RestDoorToDoorCharterResponse,
} from '../restObjects/RestDoorToDoorCharter'
import { RestDoorToDoorPollConfig } from '../restObjects/RestDoorToDoorPollConfig'
import { RestDoorToDoorPollResultRequest } from '../restObjects/RestDoorToDoorPollResultRequest'
import { PublicSubscribtionFormData, RestEvent, RestEvents } from '../restObjects/RestEvents'
import { RestHeaderInfos } from '../restObjects/RestHeaderInfos'
import { RestNews, RestNewsResponse } from '../restObjects/RestNewsResponse'
import { RestPhonePollResultRequest } from '../restObjects/RestPhonePollResultRequest'
import { RestPhoningCampaign } from '../restObjects/RestPhoningCampaign'
import { RestPhoningCharter, RestPhoningCharterAccepted, RestPhoningCharterNotAccepted, RestPhoningCharterResponse } from '../restObjects/RestPhoningCharter'
import { RestPhoningSession } from '../restObjects/RestPhoningSession'
import { RestPhoningSessionConfiguration } from '../restObjects/RestPhoningSessionConfiguration'
import { RestPollResultRequest } from '../restObjects/RestPollResultRequest'
import { RestProfileResponse } from '../restObjects/RestProfileResponse'
import { RestQuickPollItem } from '../restObjects/RestQuickPollResponse'
import { RestResetPasswordRequest } from '../restObjects/RestResetPasswordRequest'
import { RestDataProtectionRegulation } from '../restObjects/RestRestDataProtectionRegulation'
import { RestRetaliation } from '../restObjects/RestRetaliation'
import { RestSignUpRequest } from '../restObjects/RestSignUpRequest'
import { RestTimelineFeedResponse } from '../restObjects/RestTimelineFeedResponse'
import { RestToolsResponse } from '../restObjects/RestToolsResponse'
import {
  RestPostPushTokenRequest,
  RestUpdateCentersOfInterestRequest,
  RestUpdatePostalCodeRequest,
  RestUpdateProfileRequest,
  RestUpdateSubscriptionsRequest,
} from '../restObjects/RestUpdateProfileRequest'
import { RestUserScope } from '../restObjects/RestUserScope'
import { RestBuildingBlock } from './../restObjects/RestBuildingBlock'
import { RestBuildingHistoryPoint } from './../restObjects/RestBuildingHistoryPoint'
import { RestMarkdown } from './../restObjects/RestMarkdown'
import {
  mapAssociatedToken,
  mapPhonePollError,
  mapPhoningSessionError,
  mapProfileFormError,
  mapPublicSubcribeFormError,
  mapSignUpFormError,
  mapSubscriptionError,
} from './errorMappers'
import _httpClient, { publicHttpClient } from './HttpClient'
import { genericErrorMapping } from './utils'

class ApiService {
  private static instance: ApiService
  private httpClient = _httpClient
  private constructor() {}

  public async signUp(request: RestSignUpRequest): Promise<void> {
    return this.httpClient
      .post('api/membership?source=jemengage', {
        json: request,
      })
      .then(() => {})
      .catch(mapSignUpFormError)
  }

  public async getGdpr(): Promise<RestDataProtectionRegulation> {
    return this.httpClient.get('api/je-mengage/rgpd').json<RestDataProtectionRegulation>().catch(mapSignUpFormError)
  }

  public async resetPassword(request: RestResetPasswordRequest): Promise<void> {
    return this.httpClient
      .post('api/membership/forgot-password?source=jemengage', {
        json: request,
      })
      .then(() => {})
      .catch(genericErrorMapping)
  }

  public getPolls(): Promise<Array<Poll>> {
    return this.httpClient.get('api/jecoute/survey').json<Array<Poll>>().catch(genericErrorMapping)
  }

  public sendPollAnswers(request: RestPollResultRequest): Promise<void> {
    return this.httpClient
      .post('api/jecoute/survey/reply', { json: request })
      .json()
      .then(() => {})
      .catch(genericErrorMapping)
  }
  public removeProfile(): Promise<void> {
    return this.httpClient.post('api/v3/profile/unregister').json<void>().catch(genericErrorMapping)
  }

  public getRetaliations(): Promise<Array<RestRetaliation>> {
    return this.httpClient.get('api/v3/ripostes').json<Array<RestRetaliation>>().catch(genericErrorMapping)
  }

  public getRetaliation(id: string): Promise<RestRetaliation> {
    return this.httpClient
      .get('api/v3/ripostes/' + id)
      .json<RestRetaliation>()
      .catch(genericErrorMapping)
  }

  public updateProfile(userUuid: string, request: RestUpdateProfileRequest): Promise<RestDetailedProfileResponse> {
    return this.httpClient
      .put('api/v3/profile/' + userUuid, { json: request })
      .json<RestDetailedProfileResponse>()
      .catch(mapProfileFormError)
  }

  public getNews(zipCode: string, page: number): Promise<RestNewsResponse> {
    return this.httpClient
      .get('api/jecoute/news', {
        searchParams: { zipCode: zipCode, page: page, with_enriched: true },
      })
      .json<RestNewsResponse>()
      .catch(genericErrorMapping)
  }

  public getNewsDetail(newsId: string): Promise<RestNews> {
    return this.httpClient
      .get('api/jecoute/news/' + newsId)
      .json<RestNews>()
      .catch(genericErrorMapping)
  }

  public async getDepartment(zipCode: string, accessToken?: string): Promise<RestDepartmentResponse> {
    const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
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

  public async getCityFromPostalCode(postalCode: string): Promise<string | undefined> {
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

  public async getEvents(args: Omit<GetEventsSearchParametersMapperProps, 'zoneCode'>): Promise<RestEvents> {
    const searchParams = GetEventsSearchParametersMapper.map(args)

    return this.httpClient
      .get('api/v3/events', {
        searchParams: searchParams,
      })
      .json<RestEvents>()
      .catch(genericErrorMapping)
  }

  public async getPublicEvents(args: Omit<GetEventsSearchParametersMapperProps, 'zipCode'>): Promise<RestEvents> {
    const searchParams = GetEventsSearchParametersMapper.map(args)

    return this.httpClient
      .get('api/events', {
        searchParams: searchParams,
      })
      .json<RestEvents>()
      .catch(genericErrorMapping)
  }

  public getEventDetails(eventId: string): Promise<RestEvent> {
    return this.httpClient
      .get('api/v3/events/' + eventId)
      .json<RestEvent>()
      .catch(genericErrorMapping)
  }

  public getPublicEventDetails(eventId: string): Promise<RestEvent> {
    return this.httpClient
      .get('api/events/' + eventId)
      .json<RestEvent>()
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

  public async subscribePublicEvent(eventId: string, payload: PublicSubscribtionFormData) {
    return publicHttpClient
      .post('api/events/' + eventId + '/subscribe', { json: payload })
      .json()
      .then(() => {})
      .catch(mapPublicSubcribeFormError)
  }

  public async getProfileAvailableConfiguration(): Promise<RestConfigurations> {
    return this.httpClient.get('api/v3/profile/configuration').json<RestConfigurations>().catch(genericErrorMapping)
  }

  public updateCentersOfInterest(userUuid: string, request: RestUpdateCentersOfInterestRequest): Promise<void> {
    return this.httpClient
      .put('api/v3/profile/' + userUuid, { json: request })
      .json()
      .then(() => {})
      .catch(genericErrorMapping)
  }

  public updateSubscriptions(userUuid: string, request: RestUpdateSubscriptionsRequest): Promise<void> {
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

  public updateDeviceZipCode(deviceId: string, request: RestUpdatePostalCodeRequest): Promise<void> {
    return this.httpClient
      .put(`api/v3/device/${deviceId}`, { json: request })
      .json()
      .then(() => {})
      .catch(genericErrorMapping)
  }

  public getPhoningTutorial(): Promise<RestMarkdown> {
    return this.httpClient.get('api/v3/phoning_campaigns/tutorial').json<RestMarkdown>().catch(genericErrorMapping)
  }

  public getPhoningCampaigns(): Promise<Array<RestPhoningCampaign>> {
    return this.httpClient.get('api/v3/phoning_campaigns/scores').json<Array<RestPhoningCampaign>>().catch(genericErrorMapping)
  }

  public getPhoningCampaignPoll(campaignId: string): Promise<Poll> {
    return this.httpClient.get(`api/v3/phoning_campaigns/${campaignId}/survey`).json<Poll>().catch(genericErrorMapping)
  }

  public getPhoningCampaign(campaignId: string): Promise<RestPhoningCampaign> {
    return this.httpClient.get(`api/v3/phoning_campaigns/${campaignId}/scores`).json<RestPhoningCampaign>().catch(genericErrorMapping)
  }

  public getPhoningCampaignSession(campaignId: string): Promise<RestPhoningSession> {
    return this.httpClient.post(`api/v3/phoning_campaigns/${campaignId}/start`).json<RestPhoningSession>().catch(mapPhoningSessionError)
  }

  public getPhoningSessionConfiguration(sessionId: string): Promise<RestPhoningSessionConfiguration> {
    return this.httpClient
      .get(`api/v3/phoning_campaign_histories/${sessionId}/survey-config`)
      .json<RestPhoningSessionConfiguration>()
      .catch(genericErrorMapping)
  }

  public updatePhoningSessionStatus(sessionId: string, status: string, params: Record<string, string> = {}): Promise<void> {
    return this.httpClient
      .put(`api/v3/phoning_campaign_histories/${sessionId}`, {
        json: { status, ...params },
      })
      .json()
      .then(() => {})
      .catch(genericErrorMapping)
  }

  public sendPhonePollAnswers(sessionId: string, request: RestPhonePollResultRequest): Promise<void> {
    return this.httpClient
      .post(`api/v3/phoning_campaign_histories/${sessionId}/reply`, {
        json: request,
      })
      .json()
      .then(() => {})
      .catch(mapPhonePollError)
  }

  public getPhoningCharter(): Promise<RestPhoningCharter> {
    return this.httpClient
      .get('api/v3/profile/charter/phoning_campaign')
      .json<RestPhoningCharterResponse>()
      .catch(genericErrorMapping)
      .then((response) => {
        if (response.content === undefined) {
          return new RestPhoningCharterAccepted()
        } else {
          return new RestPhoningCharterNotAccepted(response.content)
        }
      })
  }

  public acceptPhoningCharter(): Promise<void> {
    return this.httpClient.put('api/v3/profile/charter/phoning_campaign/accept').json<void>().catch(genericErrorMapping)
  }

  public getDoorToDoorCharter(): Promise<RestDoorToDoorCharter> {
    return this.httpClient
      .get('api/v3/profile/charter/pap_campaign')
      .json<RestDoorToDoorCharterResponse>()
      .catch(genericErrorMapping)
      .then((response) => {
        if (response.content === undefined) {
          return new RestDoorToDoorCharterAccepted()
        } else {
          return new RestDoorToDoorCharterNotAccepted(response.content)
        }
      })
  }

  public acceptDoorToDoorCharter(): Promise<void> {
    return this.httpClient.put('api/v3/profile/charter/pap_campaign/accept').json<void>().catch(genericErrorMapping)
  }

  public buildingBlocks(buildingId: string, campaignId: string): Promise<RestBuildingBlock[]> {
    return this.httpClient
      .get(`api/v3/pap/buildings/${buildingId}/building_blocks?campaign_uuid=${campaignId}`)
      .json<RestBuildingBlock[]>()
      .catch(genericErrorMapping)
  }

  public buildingHistory(buildingId: string, campaignId: string): Promise<RestBuildingHistoryPoint[]> {
    return this.httpClient
      .get(`api/v3/pap/buildings/${buildingId}/history?campaign_uuid=${campaignId}`)
      .json<RestBuildingHistoryPoint[]>()
      .catch(genericErrorMapping)
  }

  public getAddresses(latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number): Promise<RestDoorToDoorAddress[]> {
    return this.httpClient
      .get('api/v3/pap/address/near', {
        searchParams: {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        },
      })
      .json<RestDoorToDoorAddress[]>()
      .catch(genericErrorMapping)
  }

  public getAddress(addressId: string): Promise<RestDoorToDoorAddress> {
    return this.httpClient.get(`api/v3/pap/address/${addressId}`).json<RestDoorToDoorAddress>().catch(genericErrorMapping)
  }

  public getDoorToDoorCampaign(campaignId: string): Promise<RestDoorToDoorCampaign> {
    return this.httpClient.get(`api/v3/pap_campaigns/${campaignId}`).json<RestDoorToDoorCampaign>().catch(genericErrorMapping)
  }

  public getDoorToDoorPollConfig(campaignId: string): Promise<RestDoorToDoorPollConfig> {
    return this.httpClient.get(`api/v3/pap_campaigns/${campaignId}/survey-config`).json<RestDoorToDoorPollConfig>().catch(genericErrorMapping)
  }

  public getDoorToDoorCampaignPoll(campaignId: string): Promise<Poll> {
    return this.httpClient.get(`api/v3/pap_campaigns/${campaignId}/survey`).json<Poll>().catch(genericErrorMapping)
  }

  public createDoorToDoorCampaignHistory(
    request: Record<string, string>, // object with dynamic keys
  ): Promise<RestDoorToDoorCampaignHistoryResponse> {
    return this.httpClient.post('api/v3/pap_campaign_histories', { json: request }).json<RestDoorToDoorCampaignHistoryResponse>().catch(genericErrorMapping)
  }

  public replyToDoorToDoorCampaignHistory(campaignHistoryId: string, request: RestDoorToDoorPollResultRequest): Promise<RestDoorToDoorSurveyReplyResponse> {
    return this.httpClient
      .post(`api/v3/pap_campaign_histories/${campaignHistoryId}/reply`, {
        json: request,
      })
      .json<RestDoorToDoorSurveyReplyResponse>()
      .catch(genericErrorMapping)
  }

  public sendBuildingEvent(buildingId: string, event: RestBuildingEventRequest): Promise<void> {
    return this.httpClient.post(`api/v3/pap/buildings/${buildingId}/events`, { json: event }).json<void>().catch(genericErrorMapping)
  }

  public getDoorToDoorTutorial(): Promise<RestMarkdown> {
    return this.httpClient.get('api/v3/pap_campaigns/tutorial').json<RestMarkdown>().catch(genericErrorMapping)
  }

  public getDoorToDoorCampaignRanking(campaignId: string): Promise<Array<RestDoorToDoorCampaignRanking>> {
    return this.httpClient.get(`api/v3/pap_campaigns/${campaignId}/ranking`).json<Array<RestDoorToDoorCampaignRanking>>().catch(genericErrorMapping)
  }

  public updateBuildingType(buildingId: string, request: RestBuildingTypeRequest): Promise<Array<RestDoorToDoorCampaignRanking>> {
    return this.httpClient.put(`api/v3/pap/buildings/${buildingId}`, { json: request }).json<Array<RestDoorToDoorCampaignRanking>>().catch(genericErrorMapping)
  }

  public async getTools(page: number): Promise<RestToolsResponse> {
    return this.httpClient
      .get('api/v3/jecoute/resource-links', { searchParams: { page: page } })
      .json<RestToolsResponse>()
      .catch(genericErrorMapping)
  }

  public getHomeHeader(): Promise<RestHeaderInfos> {
    return this.httpClient.get('api/v3/je-mengage/headers/page-accueil').json<RestHeaderInfos>().catch(genericErrorMapping)
  }

  public getLoginHeader(): Promise<RestHeaderInfos> {
    return publicHttpClient.get('api/je-mengage/headers/page-connexion').json<RestHeaderInfos>().catch(genericErrorMapping)
  }

  public async getPlaceAutocomplete(query: string, signal?: AbortSignal): Promise<google.maps.places.AutocompletePrediction[]> {
    return this.httpClient
      .get(
        `api/v3/place/autocomplete?${stringify({
          input: query,
        })}`,
        {
          signal,
        },
      )
      .json()
      .then((response: { predictions: google.maps.places.AutocompletePrediction[] }) => response.predictions)
      .catch(genericErrorMapping)
  }

  public async getPlaceDetails(placeId: string, signal?: AbortSignal): Promise<GoogleAddressPlaceResult | null> {
    return this.httpClient
      .get(
        `api/v3/place/details?${stringify({
          place_id: placeId,
          fields: 'formatted_address,address_components,geometry',
        })}`,
        {
          signal,
        },
      )
      .json()
      .then((data: { result: google.maps.places.PlaceResult }) =>
        data?.result
          ? ({
              formatted: data.result.formatted_address,
              details: data.result.address_components,
              geometry: data.result.geometry,
            } as GoogleAddressPlaceResult)
          : null,
      )
      .catch(genericErrorMapping)
  }

  public async getActions({ subscribeOnly, longitude, latitude, type, period }: RestActionRequestParams) {
    const calcPeriod = (period?: SelectPeriod) => {
      switch (period) {
        case 'today':
          return {
            after: startOfDay(new Date()).toISOString(),
            before: endOfDay(new Date()).toISOString(),
          }
        case 'tomorow':
          return {
            after: startOfDay(addDays(new Date(), 1)).toISOString(),
            before: endOfDay(addDays(new Date(), 1)).toISOString(),
          }
        case 'week':
          return {
            after: startOfDay(new Date()).toISOString(),
            before: endOfDay(addDays(new Date(), 7).toISOString()),
          }
        default:
          return null
      }
    }

    const periodDate = calcPeriod(period as SelectPeriod)

    const params = {
      ...(type !== FilterActionType.ALL ? { type } : {}),
      ...(period && periodDate ? { 'date[after]': periodDate.after, 'date[before]': periodDate.before } : {}),
      ...(subscribeOnly ? { subscribeOnly: true } : {}),
      longitude,
      latitude,
    }
    return this.httpClient.get('api/v3/actions', { searchParams: params }).json().then(ActionPaginationSchema.parse).catch(genericErrorMapping)
  }

  public async insertAction(payload: ActionCreateType, scope?: string) {
    return this.httpClient
      .post('api/v3/actions', {
        searchParams: scope
          ? {
              scope,
            }
          : undefined,
        json: {
          ...payload,
          date: payload.date.toISOString(),
        },
      })
      .json()
      .catch(genericErrorMapping)
  }

  public async editAction(uuid: string, payload: ActionCreateType, scope?: string) {
    return this.httpClient
      .put(`api/v3/actions/${uuid}`, {
        json: {
          ...payload,
          date: payload.date.toISOString(),
          scope,
        },
      })
      .json()
      .catch(genericErrorMapping)
  }

  public async getAction(id: string, scope?: string) {
    return this.httpClient
      .get(`api/v3/actions/${id}`, {
        searchParams: scope ? { scope } : undefined,
      })
      .json()
      .then(ActionFullSchema.parse)
      .catch(genericErrorMapping)
  }

  public async subscribeToAction(id: string) {
    return this.httpClient.post(`api/v3/actions/${id}/register`).json().catch(genericErrorMapping)
  }

  public async unsubscribeFromAction(id: string) {
    return this.httpClient.delete(`api/v3/actions/${id}/register`).json().catch(genericErrorMapping)
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }
}

export interface GoogleAddressPlaceResult {
  formatted?: string
  details?: google.maps.GeocoderAddressComponent[]
  geometry?: google.maps.GeocoderGeometry
}

export default ApiService
