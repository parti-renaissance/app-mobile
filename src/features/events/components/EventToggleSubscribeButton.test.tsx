import React from 'react'
import { useSubscribeEvent, useUnsubscribeEvent } from '@/services/events/hook'
import * as mockedEvnt from '@/services/events/mock/feed-item'
import TamaguiProvider from '@/tamagui/provider'
import { Calendar, CalendarOff } from '@tamagui/lucide-icons'
import { fireEvent, render } from '@testing-library/react-native'
import { EventToggleSubscribeButton } from './EventToggleSubscribeButton'

const mockedUnSubMutate = jest.fn()
const mockedSubMutate = jest.fn()
// mock src/services/events/api.ts
jest.mock('@/services/events/hook', () => {
  return {
    __esModule: true,
    useUnsubscribeEvent: jest.fn(() => ({
      mutate: mockedUnSubMutate,
      isPending: false,
    })),
    useSubscribeEvent: jest.fn(() => ({
      mutate: mockedSubMutate,
      isPending: false,
    })),
  }
})

jest.mock('@/services/profile/hook', () => {
  return {
    __esModule: true,
    useGetProfil: jest.fn(() => ({
      data: {
        uuid: 'lol',
      },
    })),
  }
})

jest.mock('@/ctx/SessionProvider', () => {
  return {
    __esModule: true,
    useSession: jest.fn(() => ({
      isAuth: true,
    })),
  }
})

const customRender: typeof render = (ui) => {
  return render(<TamaguiProvider>{ui}</TamaguiProvider>)
}

describe('EventToggleSubscribeButton', () => {
  it('should display "Unsubscribe" button when registered ', async () => {
    const { getByTestId } = customRender(
      <EventToggleSubscribeButton
        event={{
          uuid: 'unsubscribe-id',
          ...mockedEvnt.registerEvent,
        }}
      />,
    )
    const button = getByTestId('event-unsubscribe-button')
    expect(button).toBeTruthy()
  })

  it('should display "Subscribe" button when unregistered ', async () => {
    const { getByTestId } = customRender(
      <EventToggleSubscribeButton
        event={{
          uuid: 'subscribe-id',
          ...mockedEvnt.unRegisterEvent,
        }}
      />,
    )
    const button = getByTestId('event-subscribe-button')
    expect(button).toBeTruthy()
  })

  it('should be hide when canceled', async () => {
    const { root } = customRender(
      <EventToggleSubscribeButton
        event={{
          uuid: 'subscribe-id',
          ...mockedEvnt.cancelledEvent,
        }}
      />,
    )
    expect(root).toBeUndefined()
  })

  it('should be hide when finished', async () => {
    const { root } = customRender(
      <EventToggleSubscribeButton
        event={{
          uuid: 'subscribe-id',
          ...mockedEvnt.finishedEvent,
        }}
      />,
    )
    expect(root).toBeUndefined()
  })

  it('should be hide when capacity is full', async () => {
    const { root } = customRender(
      <EventToggleSubscribeButton
        event={{
          uuid: 'subscribe-id',
          ...mockedEvnt.capacityFullEvent,
        }}
      />,
    )
    expect(root).toBeUndefined()
  })

  it('should not be disabled if capacity is full and registered', async () => {
    const { getByTestId } = customRender(
      <EventToggleSubscribeButton
        event={{
          uuid: 'subscribe-id',
          ...mockedEvnt.capacityFullEvent,
          ...mockedEvnt.registerEvent,
        }}
      />,
    )
    const button = getByTestId('event-unsubscribe-button')
    expect(button).not.toBeDisabled()
  })

  it('should not display if the user is the author', async () => {
    const userUUID = 'author_uuid'
    const { root } = customRender(
      <EventToggleSubscribeButton
        userUuid={userUUID}
        event={{
          uuid: 'subscribe-id',
          organizer: {
            ...mockedEvnt.organizer,
            uuid: userUUID,
          },
        }}
      />,
    )

    expect(root).toBeUndefined()
  })

  it('should display lock subsrcibe button to adherents', async () => {
    const { getByTestId } = customRender(
      <EventToggleSubscribeButton
        event={{
          uuid: 'subscribe-id',
          object_state: 'partial',
          visibility: 'adherent',
        }}
      />,
    )

    const button = getByTestId('event-subscribe-lock-button')
    expect(button).toBeTruthy()
  })

  it('should display lock subsrcibe button to adherents with pending dues', async () => {
    const { getByTestId } = customRender(
      <EventToggleSubscribeButton
        event={{
          uuid: 'subscribe-id',
          object_state: 'partial',
          visibility: 'adherent_dues',
        }}
      />,
    )

    const button = getByTestId('event-subscribe-lock-button')
    expect(button).toBeTruthy()
  })
})
