import React from 'react'
import * as eventTypes from '@/services/events/schema'
import { useGetSuspenseProfil } from '@/services/profile/hook'
import { useMedia } from 'tamagui'
import EventDesktopScreen from './EventDesktopScreen'
import EventMobileScreen from './EventMobileScreen'

export default function EventDetailsScreen({ data }: { data: eventTypes.RestEvent }) {
  const media = useMedia()
  const { data: user } = useGetSuspenseProfil()
  return media.sm ? <EventMobileScreen event={data} userUuid={user?.uuid} /> : <EventDesktopScreen event={data} userUuid={user?.uuid} />
}
