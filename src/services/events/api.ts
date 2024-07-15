import { mapParams, type GetEventsSearchParametersMapperProps } from '@/services/events/paramsMapper'
import * as schemas from '@/services/events/schema'
import type * as Types from '@/services/events/schema'
import { api } from '@/utils/api'

export const getEvents = (params: GetEventsSearchParametersMapperProps) =>
  api<Types.RestGetEventsRequest, Types.RestGetEventsResponse>({
    method: 'get',
    path: '/api/v3/events',
    requestSchema: schemas.RestGetEventsRequestSchema,
    responseSchema: schemas.RestGetEventsResponseSchema,
    type: 'private',
  })(mapParams(params))

export const getPublicEvents = api<Types.RestGetEventsRequest, Types.RestGetEventsResponse>({
  method: 'get',
  path: '/api/events',
  requestSchema: schemas.RestGetEventsRequestSchema,
  responseSchema: schemas.RestGetEventsResponseSchema,
  type: 'public',
})

// export const getEventDetails = (eventId: string) =>
//   api<void, Types.RestGetEventDetailsResponse>({
//     method: 'get',
//     path: `/api/v3/events/${eventId}`,
//     requestSchema: schemas.RestGetEventDetailsRequestSchema,
//     responseSchema: schemas.RestGetEventDetailsResponseSchema,
//     type: 'private',
//   })()

// export const getPublicEventDetails = (eventId: string) =>
//   api<void, Types.RestGetEventDetailsResponse>({
//     method: 'get',
//     path: `/api/events/${eventId}`,
//     requestSchema: schemas.RestGetEventDetailsRequestSchema,
//     responseSchema: schemas.RestGetEventDetailsResponseSchema,
//     type: 'public',
//   })()

// export const subscribeToEvent = (eventId: string) =>
//   api<void, void>({
//     method: 'post',
//     path: `/api/v3/events/${eventId}/subscribe`,
//     requestSchema: schemas.RestSubscribeToEventRequestSchema,
//     responseSchema: schemas.RestSubscribeToEventResponseSchema,
//     type: 'private',
//   })()

// export const unsubscribeFromEvent = (eventId: string) =>
//   api<void, void>({
//     method: 'delete',
//     path: `/api/v3/events/${eventId}/subscribe`,
//     requestSchema: schemas.RestUnsubscribeFromEventRequestSchema,
//     responseSchema: schemas.RestUnsubscribeFromEventResponseSchema,
//     type: 'private',
//   })()

// export const subscribePublicEvent = (eventId: string, payload: Types.PublicSubscribtionFormData) =>
//   api<Types.PublicSubscribtionFormData, void>({
//     method: 'post',
//     path: `/api/events/${eventId}/subscribe`,
//     requestSchema: schemas.RestSubscribePublicEventRequestSchema,
//     responseSchema: schemas.RestSubscribePublicEventResponseSchema,
//     type: 'public',
//   })(payload)

// public async getEvents(args: Omit<GetEventsSearchParametersMapperProps, 'zoneCode'>): Promise<RestEvents> {
//   const searchParams = GetEventsSearchParametersMapper.map(args)

//   return this.httpClient
//     .get('api/v3/events', {
//       searchParams: searchParams,
//     })
//     .json<RestEvents>()
//     .catch(genericErrorMapping)
// }

// public async getPublicEvents(args: Omit<GetEventsSearchParametersMapperProps, 'zipCode'>): Promise<RestEvents> {
//   const searchParams = GetEventsSearchParametersMapper.map(args)

//   return this.httpClient
//     .get('api/events', {
//       searchParams: searchParams,
//     })
//     .json<RestEvents>()
//     .catch(genericErrorMapping)
// }

// public getEventDetails(eventId: string): Promise<RestEvent> {
//   return this.httpClient
//     .get('api/v3/events/' + eventId)
//     .json<RestEvent>()
//     .catch(genericErrorMapping)
// }

// public getPublicEventDetails(eventId: string): Promise<RestEvent> {
//   return this.httpClient
//     .get('api/events/' + eventId)
//     .json<RestEvent>()
//     .catch(genericErrorMapping)
// }

// public subscribeToEvent(eventId: string): Promise<void> {
//   return this.httpClient
//     .post('api/v3/events/' + eventId + '/subscribe')
//     .json()
//     .then(() => {})
//     .catch(mapSubscriptionError)
// }

// public unsubscribeFromEvent(eventId: string): Promise<void> {
//   return this.httpClient
//     .delete('api/v3/events/' + eventId + '/subscribe')
//     .json()
//     .then(() => {})
//     .catch(mapSubscriptionError)
// }

// public async subscribePublicEvent(eventId: string, payload: PublicSubscribtionFormData) {
//   return publicHttpClient
//     .post('api/events/' + eventId + '/subscribe', { json: payload })
//     .json()
//     .then(() => {})
//     .catch(mapPublicSubcribeFormError)
// }
