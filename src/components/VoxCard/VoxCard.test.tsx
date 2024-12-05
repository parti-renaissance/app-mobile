import React from 'react'
import { render } from '@/utils/test-utils'
import VoxCard from './VoxCard'

jest.mock('expo-image', () => {
  return {
    __esModule: true,
    default: () => {
      return <></>
    },
  }
})

describe('VoxCard.Date', () => {
  it('should render date period', () => {
    const { getByText } = render(
      <VoxCard.Date start={new Date('2030-08-09T10:59:52+02:00')} end={new Date('2030-08-09T11:59:52+02:00')} timeZone={'Europe/Paris'} />,
    )

    const date = getByText('vendredi 9 août 2030 à 10:59 / 11:59')
    expect(date).toBeTruthy()
  })

  it('should render date without end date', () => {
    const { getByText } = render(<VoxCard.Date start={new Date('2030-08-09T10:59:52+02:00')} timeZone={'Europe/Paris'} />)

    const date = getByText('vendredi 9 août 2030 à 10:59')
    expect(date).toBeTruthy()
  })

  it('should render date without timezone', () => {
    const { getByText } = render(<VoxCard.Date start={new Date('2030-08-09T10:59:52+02:00')} />)

    const date = getByText('vendredi 9 août 2030 à 10:59')
    expect(date).toBeTruthy()
  })
})

describe('VoxCard.Author', () => {
  it('should render name', () => {
    const { getByText } = render(<VoxCard.Author author={{ name: 'Victor Fortest' }} />)
    const date = getByText('Victor Fortest')
    expect(date).toBeTruthy()
  })
  it('should render name and role', () => {
    const { getByText } = render(<VoxCard.Author author={{ name: 'Victor Fortest', role: 'Journaliste' }} />)
    const date = getByText('Victor Fortest, Journaliste')
    expect(date).toBeTruthy()
  })
})
