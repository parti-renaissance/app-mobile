import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import * as metatags from '@/config/metatags'
import EditInformations from '@/screens/editPersonalInformation/personalInformations'
import { Stack as RouterStack } from 'expo-router'
import Head from 'expo-router/head'

function ProfilScreen() {
  return (
    <>
      <Head>
        <title>{metatags.createTitle('Mon profil')}</title>
      </Head>
      <RouterStack.Screen
        options={{
          headerShown: false,
        }}
      />
      <PageLayout>
        <PageLayout.SideBarLeft />
        <PageLayout.MainSingleColumn>
          <BoundarySuspenseWrapper>
            <EditInformations />
          </BoundarySuspenseWrapper>
        </PageLayout.MainSingleColumn>
        <PageLayout.SideBarRight />
      </PageLayout>
    </>
  )
}

export default ProfilScreen
