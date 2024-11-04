import BotBilanCTA from '@/components/ProfileCards/BotBilanCTA/BotBilanCTA'
import { StoryObj } from '@storybook/react'
import { View } from 'tamagui'

const meta = {
  title: 'Profil CTA/Bilan Bot',
  component: () => (
    <View width={400}>
      <BotBilanCTA />
    </View>
  ),
}

type Story = StoryObj<typeof BotBilanCTA>

export const Default: Story = {}

export default meta
