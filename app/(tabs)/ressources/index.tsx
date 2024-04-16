import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import ResourcesList from '@/screens/tools/ResourcesList'
import { Stack as RouterStack } from 'expo-router'
import * as metatags from '@/config/metatags'
import Head from 'expo-router/head'

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
        <PageLayout.SideBarLeft />
        <PageLayout.MainSingleColumn>
          <BoundarySuspenseWrapper loadingMessage="Nous chargeons les ressources">
            <ResourcesList />
          </BoundarySuspenseWrapper>
        </PageLayout.MainSingleColumn>
      </PageLayout>
    </>
  )
}

export default ToolsScreen
