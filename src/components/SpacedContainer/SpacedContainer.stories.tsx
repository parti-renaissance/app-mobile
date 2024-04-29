import { PropsWithChildren } from 'react'
import SpacedContainer from '@/components/SpacedContainer/SpacedContainer'
import { StoryObj } from '@storybook/react'
import Text from '../base/Text'

const meta = {
  title: 'Layout',
  component: ({ children }: PropsWithChildren) => (
    <>
      <SpacedContainer>
        <Text>{children}</Text>
      </SpacedContainer>
      <SpacedContainer>
        <Text>{children}</Text>
      </SpacedContainer>
      <SpacedContainer>
        <Text>{children}</Text>
      </SpacedContainer>
    </>
  ),
}

type Story = StoryObj<typeof SpacedContainer>

export const SpacedContainerComponent: Story = {
  storyName: 'SpacedContainer',
  args: {
    children: 'This text has bottom default spacing',
  },
}

export default meta
