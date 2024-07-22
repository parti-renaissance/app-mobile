import { mapParams, type GetEventsSearchParametersMapperProps } from '@/services/events/paramsMapper'
import * as schemas from '@/services/events/schema'
import { api } from '@/utils/api'
import { z } from 'zod'
import { publicEventSubscriptionFormErrorThrower } from './error'

export const getEvents = (params: GetEventsSearchParametersMapperProps) =>
  api({
    method: 'get',
    path: '/api/v3/events',
    requestSchema: schemas.RestGetEventsRequestSchema,
    responseSchema: schemas.RestGetEventsResponseSchema,
    type: 'private',
  })(mapParams(params))

export const getPublicEvents = (params: GetEventsSearchParametersMapperProps) =>
  api({
    method: 'get',
    path: '/api/events',
    requestSchema: schemas.RestGetEventsRequestSchema,
    responseSchema: schemas.RestGetPublicEventsResponseSchema,
    type: 'public',
  })(mapParams(params))

export const getEventDetails = (eventId: string) =>
  api({
    method: 'get',
    path: `/api/v3/events/${eventId}`,
    requestSchema: schemas.RestGetEventDetailsRequestSchema,
    responseSchema: schemas.RestGetEventDetailsResponseSchema,
    type: 'private',
  })()

export const getPublicEventDetails = (eventId: string) =>
  api({
    method: 'get',
    path: `/api/events/${eventId}`,
    requestSchema: schemas.RestGetEventDetailsRequestSchema,
    responseSchema: schemas.RestGetPublicEventDetailsResponseSchema,
    type: 'public',
  })()

export const subscribeToEvent = (eventId: string) =>
  api<void, void>({
    method: 'post',
    path: `/api/v3/events/${eventId}/subscribe`,
    requestSchema: z.void(),
    responseSchema: z.any(),
    type: 'private',
  })()

export const unsubscribeFromEvent = (eventId: string) =>
  api<void, void>({
    method: 'delete',
    path: `/api/v3/events/${eventId}/subscribe`,
    requestSchema: z.void(),
    responseSchema: z.any(),
    type: 'private',
  })()

export const subscribePublicEvent = (eventId: string, payload: schemas.RestPostPublicEventSubsciptionRequest) =>
  api({
    method: 'post',
    path: `/api/events/${eventId}/subscribe`,
    requestSchema: schemas.RestPostPublicEventSubsciptionRequest,
    responseSchema: z.void(),
    errorThrowers: [publicEventSubscriptionFormErrorThrower],
    type: 'public',
  })(payload)
