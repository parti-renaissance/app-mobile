import ProcurationCTA from '@/components/ProfileCards/ProcurationCTA/ProcurationCTA'
import { StoryObj } from '@storybook/react'
import { View } from 'tamagui'

const meta = {
  title: 'Profile CTA/Procuration',
  component: () => (
    <View width={400}>
      <ProcurationCTA />
    </View>
  ),
}

type Story = StoryObj<typeof ProcurationCTA>

export const Default: Story = {}

export default meta
