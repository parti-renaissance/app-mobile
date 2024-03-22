import React from 'react'
import TamaguiProvider from '@/tamagui/provider'
import { render, screen } from '@testing-library/react-native'
import Button from './Button'

describe('Button', () => {
  it('renders text', () => {
    render(
      <TamaguiProvider>
        <Button>
          <Button.Text>Text</Button.Text>
        </Button>
      </TamaguiProvider>,
    )

    expect(screen.getByText('Text')).toBeTruthy()
  })
})
