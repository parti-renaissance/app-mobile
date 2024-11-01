import React from 'react'
import * as mockedEvnt from '@/services/events/mock/feed-item'
import TamaguiProvider from '@/tamagui/provider'
import { Check } from '@tamagui/lucide-icons'
import { render } from '@testing-library/react-native'
import { EventPremiumChip } from './EventPremiumChip'

const customRender: typeof render = (ui) => {
  return render(<TamaguiProvider>{ui}</TamaguiProvider>)
}

describe('EventPremiumChip', () => {
  it('should display "Réservé aux adhérents" when event reserved to adherant ', async () => {
    const { root } = customRender(
      <EventPremiumChip
        event={{
          uuid: 'id',
          object_state: 'full',
          visibility: 'adherent',
        }}
      />,
    )
    expect(root).toHaveTextContent('Réservé aux adhérents')
  })

  it('should display "Réservé aux adhérents" when event reserved to adherant dues ', async () => {
    const { root } = customRender(
      <EventPremiumChip
        event={{
          uuid: 'id',
          object_state: 'full',
          visibility: 'adherent_dues',
        }}
      />,
    )
    expect(root).toHaveTextContent('Réservé aux adhérents à jour')
  })
})
