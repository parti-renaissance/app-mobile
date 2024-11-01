import React, { NamedExoticComponent } from 'react'
import * as mockedEvnt from '@/services/events/mock/feed-item'
import TamaguiProvider from '@/tamagui/provider'
import { IconProps } from '@tamagui/helpers-icon'
import { Clock9, Users, XCircle } from '@tamagui/lucide-icons'
import { render } from '@testing-library/react-native'
import type { ReactTestInstance } from 'react-test-renderer'
import { StatusChip } from './StatusChip'

const customRender: typeof render = (ui) => {
  return render(<TamaguiProvider>{ui}</TamaguiProvider>)
}

const expectChip = (
  instance: ReactTestInstance,
  payload: {
    name: string
    icon: NamedExoticComponent<IconProps>
  },
) => {
  expect(instance).toBeTruthy()
  expect(instance).toHaveTextContent(payload.name)
  expect(instance).toHaveProp('icon', payload.icon)
}

describe('StatusChip', () => {
  it('should render status "Terminé chip"', () => {
    const { getByTestId } = customRender(<StatusChip event={mockedEvnt.finishedEvent} />)
    expectChip(getByTestId('status-event-chip'), {
      name: 'Terminé',
      icon: Clock9,
    })
  })

  it('should render status "Cancel chip"', () => {
    const { getByTestId } = customRender(
      <StatusChip
        event={{
          ...mockedEvnt.finishedEvent,
          ...mockedEvnt.cancelledEvent,
        }}
      />,
    )
    expectChip(getByTestId('status-event-chip'), {
      name: 'Annulé',
      icon: XCircle,
    })
  })

  it('should render button "Complet chip"', () => {
    const { getByTestId } = customRender(<StatusChip event={mockedEvnt.capacityFullEvent} />)
    expectChip(getByTestId('status-event-chip'), {
      name: 'Complet',
      icon: Users,
    })
  })
})
