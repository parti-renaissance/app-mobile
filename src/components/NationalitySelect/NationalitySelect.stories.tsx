import { useState } from 'react'
import BotBilanCTA from '@/components/ProfileCards/BotBilanCTA/BotBilanCTA'
import { StoryObj } from '@storybook/react'
import { View } from 'tamagui'
import Text from '../base/Text'
import NationalitySelect from './NationalitySelect'

const Component = () => {
  const [state, setState] = useState('FR')

  return (
    <View width={400}>
      <NationalitySelect id="nationality" value={state} onChange={setState} />

      <Text mt="$4">Selected nationality is {state}</Text>
    </View>
  )
}

const meta = {
  title: 'Select/Nationality',
  component: Component,
}

type Story = StoryObj<typeof BotBilanCTA>

export const Default: Story = {}

export default meta
