import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import EventfeedList from '@/screens/events/EventFeedList'
import { Stack as RouterStack } from 'expo-router'
import { Stack, Text, YStack } from 'tamagui'

import React from 'react'

const HomeScreen: React.FC = () => {
  return (
    <>
      <RouterStack.Screen options={{
        headerShown: false
      }} />

      <YStack flex={1}>
        <PageLayout sidebar={<Text>Test</Text>}>
          <Stack $gtSm={{ flexDirection: 'row', gap: 8 }} flex={1}>
            <Stack flex={1} $gtSm={{ flex: 10 }} gap={2}>
              <BoundarySuspenseWrapper loadingMessage="Nous chargons les évenements">
                <EventfeedList />
              </BoundarySuspenseWrapper>
            </Stack>
          </Stack>
        </PageLayout>
      </YStack>
    </>
  )
}

export default HomeScreen
