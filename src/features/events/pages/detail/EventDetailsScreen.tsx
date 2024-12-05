import React from 'react'
import { useSession } from '@/ctx/SessionProvider'
import * as eventTypes from '@/services/events/schema'
import { useMedia } from 'tamagui'
import EventDesktopScreen, { EventDesktopScreenDeny, EventDesktopScreenSkeleton } from './EventDesktopScreen'
import EventMobileScreen, { EventMobileScreenDeny, EventMobileScreenSkeleton } from './EventMobileScreen'

export default function EventDetailsScreen({ data }: { data: eventTypes.RestEvent }) {
  const media = useMedia()
  const { user } = useSession()
  return media.sm ? <EventMobileScreen event={data} userUuid={user?.data?.uuid} /> : <EventDesktopScreen event={data} userUuid={user?.data?.uuid} />
}

export function EventDetailsScreenSkeleton() {
  const media = useMedia()
  return media.sm ? <EventMobileScreenSkeleton /> : <EventDesktopScreenSkeleton />
}

export function EventDetailsScreenDeny() {
  const media = useMedia()
  return media.sm ? <EventMobileScreenDeny /> : <EventDesktopScreenDeny />
}
