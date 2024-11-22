import ProfileCard, { ProfileCardProps } from '@/components/ProfileCards/ProfileCard/ProfileCard'
import { StoryObj } from '@storybook/react'
import { View } from 'tamagui'

const meta = {
  title: 'Profile CTA/Profile Card',
  component: ({ ...args }: ProfileCardProps) => (
    <View width={400} gap={'$medium'} backgroundColor={'$gray4'}>
      <ProfileCard {...args} />
      <ProfileCard onButtonPress={() => {}} {...args} />
    </View>
  ),
}

type Story = StoryObj<typeof ProfileCard>

export const Default: Story = {
  args: {
    firstName: 'John',
    lastName: 'Doe',
    tags: [
      {
        label: 'Élu',
        type: 'elu',
      },
    ],
  },
}

export default meta
