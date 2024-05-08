import { useState } from 'react'
import BotBilanCTA from '@/components/ProfileCards/BotBilanCTA/BotBilanCTA'
import { StoryObj } from '@storybook/react'
import { View } from 'tamagui'
import Text from '../base/Text'
import CountrySelect from './CountrySelect'

const Component = () => {
  const [state, setState] = useState('FR')

  return (
    <View width={400}>
      <CountrySelect id="country" value={state} onChange={setState} />

      <Text mt="$4">Selected country is {state}</Text>
    </View>
  )
}

const meta = {
  title: 'Select/Country',
  component: Component,
}

type Story = StoryObj<typeof BotBilanCTA>

export const Default: Story = {}

export default meta
