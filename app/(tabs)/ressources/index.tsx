import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AppDownloadCTA from '@/components/ProfileCards/AppDownloadCTA/AppDownloadCTA'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import * as metatags from '@/config/metatags'
import ResourcesList from '@/screens/tools/ResourcesList'
import { Stack as RouterStack } from 'expo-router'
import Head from 'expo-router/head'
import { YStack } from 'tamagui'

const RessourceCardSkeleton = () => {
  return (
    <SkeCard borderColor="gray2" $gtSm={{ flex: 1 }} borderRadius="$8">
      <SkeCard.Content>
        <YStack height="$8" />
        <SkeCard.Description />
      </SkeCard.Content>
    </SkeCard>
  )
}

const DoubleRessourceCardSkeleton = () => {
  return (
    <YStack gap="$4" $gtSm={{ flexDirection: 'row' }}>
      <RessourceCardSkeleton />
      <RessourceCardSkeleton />
    </YStack>
  )
}

const ToolsSkeleton = () => {
  return (
    <YStack gap="$4" padding="$8" $sm={{ paddingTop: '$4' }}>
      <DoubleRessourceCardSkeleton />
      <DoubleRessourceCardSkeleton />
      <DoubleRessourceCardSkeleton />
    </YStack>
  )
}

const ToolsScreen: React.FC = () => {
  return (
    <>
      <RouterStack.Screen
        options={{
          headerShown: false,
        }}
      />

      <Head>
        <title>{metatags.createTitle('Ressources')}</title>
      </Head>

      <PageLayout>
        <PageLayout.SideBarLeft>
          <AppDownloadCTA />
        </PageLayout.SideBarLeft>
        <PageLayout.MainSingleColumn>
          <BoundarySuspenseWrapper fallback={<ToolsSkeleton />}>
            <ResourcesList />
          </BoundarySuspenseWrapper>
        </PageLayout.MainSingleColumn>
      </PageLayout>
    </>
  )
}

export default ToolsScreen
