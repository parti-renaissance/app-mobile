import React from 'react'
import { useSubscribeEvent, useUnsubscribeEvent } from '@/services/events/hook'
import * as mockedEvnt from '@/services/events/mock/feed-item'
import TamaguiProvider from '@/tamagui/provider'
import { Calendar, CalendarOff } from '@tamagui/lucide-icons'
import { fireEvent, render } from '@testing-library/react-native'
import { EventItemSubscribeButton, EventItemToggleSubscribeButton, EventItemUnSubscribeButton } from './EventItemSubscribeButton'

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

describe('EventItemToggleSubscribeButton', () => {
  it('should display "Unsubscribe" button when registered ', async () => {
    const { getByTestId } = customRender(
      <EventItemToggleSubscribeButton
        event={{
          uuid: 'unsubscribe-id',
          ...mockedEvnt.registerEvent,
        }}
      />,
    )
    const button = getByTestId('event-item-unsubscribe-button')
    expect(button).toBeTruthy()
  })

  it('should display "Subscribe" button when unregistered ', async () => {
    const { getByTestId } = customRender(
      <EventItemToggleSubscribeButton
        event={{
          uuid: 'subscribe-id',
          ...mockedEvnt.unRegisterEvent,
        }}
      />,
    )
    const button = getByTestId('event-item-subscribe-button')
    expect(button).toBeTruthy()
  })

  it('should be disabled when canceled', async () => {
    const { getByTestId } = customRender(
      <EventItemToggleSubscribeButton
        event={{
          uuid: 'subscribe-id',
          ...mockedEvnt.cancelledEvent,
        }}
      />,
    )
    const button = getByTestId('event-item-subscribe-button')
    expect(button).toBeDisabled()
  })

  it('should be disabled when finished', async () => {
    const { getByTestId } = customRender(
      <EventItemToggleSubscribeButton
        event={{
          uuid: 'subscribe-id',
          ...mockedEvnt.finishedEvent,
        }}
      />,
    )
    const button = getByTestId('event-item-subscribe-button')
    expect(button).toBeDisabled()
  })

  it('should be disabled when capacity is full', async () => {
    const { getByTestId } = customRender(
      <EventItemToggleSubscribeButton
        event={{
          uuid: 'subscribe-id',
          ...mockedEvnt.capacityFullEvent,
        }}
      />,
    )
    const button = getByTestId('event-item-subscribe-button')
    expect(button).toBeDisabled()
  })

  it('should not be disabled if capacity is full and registered', async () => {
    const { getByTestId } = customRender(
      <EventItemToggleSubscribeButton
        event={{
          uuid: 'subscribe-id',
          ...mockedEvnt.capacityFullEvent,
          ...mockedEvnt.registerEvent,
        }}
      />,
    )
    const button = getByTestId('event-item-unsubscribe-button')
    expect(button).not.toBeDisabled()
  })

  it('should not display if the user is the author', async () => {
    const userUUID = 'author_uuid'
    const { root } = customRender(
      <EventItemToggleSubscribeButton
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
      <EventItemToggleSubscribeButton
        event={{
          uuid: 'subscribe-id',
          object_state: 'partial',
          visibility: 'adherent',
        }}
      />,
    )

    const button = getByTestId('event-item-subscribe-lock-button')
    expect(button).toBeTruthy()
  })

  it('should display lock subsrcibe button to adherents with pending dues', async () => {
    const { getByTestId } = customRender(
      <EventItemToggleSubscribeButton
        event={{
          uuid: 'subscribe-id',
          object_state: 'partial',
          visibility: 'adherent_dues',
        }}
      />,
    )

    const button = getByTestId('event-item-subscribe-lock-button')
    expect(button).toBeTruthy()
  })
})

describe('EventItemUnSubscribeButton', () => {
  it('should call unsusbcribe hook', async () => {
    const { getByTestId } = customRender(<EventItemUnSubscribeButton uuid="unsubscribe-id" />)
    const button = getByTestId('event-item-unsubscribe-button')
    expect(button).toHaveTextContent('Me désinscrire')
    expect(button).toHaveProp('iconLeft', CalendarOff)
    expect(useUnsubscribeEvent).toHaveBeenCalledWith({ id: 'unsubscribe-id' })
    fireEvent.press(button)
    expect(mockedUnSubMutate).toHaveBeenCalled()
  })
})

describe('EventItemSubscribeButton', () => {
  it('should call susbcribe hook', async () => {
    const { getByTestId } = customRender(<EventItemSubscribeButton uuid="subscribe-id" />)
    const button = getByTestId('event-item-subscribe-button')
    expect(button).toHaveTextContent("M'inscrire")
    expect(button).toHaveProp('iconLeft', Calendar)
    expect(useSubscribeEvent).toHaveBeenCalledWith({ id: 'subscribe-id' })
    fireEvent.press(button)
    expect(mockedSubMutate).toHaveBeenCalled()
  })
})
