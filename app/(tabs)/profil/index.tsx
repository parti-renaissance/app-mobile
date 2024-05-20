import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AppDownloadCTA from '@/components/ProfileCards/AppDownloadCTA/AppDownloadCTA'
import BotBilanCTA from '@/components/ProfileCards/BotBilanCTA/BotBilanCTA'
import ProcurationCTA from '@/components/ProfileCards/ProcurationCTA/ProcurationCTA'
import * as metatags from '@/config/metatags'
import EditInformations from '@/screens/editPersonalInformation/PersonalInformations'
import { Stack as RouterStack } from 'expo-router'
import Head from 'expo-router/head'
import { YStack } from 'tamagui'

function ProfilScreen() {
  return (
    <>
      <Head>
        <title>{metatags.createTitle('Mon profil')}</title>
      </Head>

      <PageLayout>
        <PageLayout.SideBarLeft>
          <YStack gap="$3">
            <ProcurationCTA />
            <AppDownloadCTA />
            <BotBilanCTA />
          </YStack>
        </PageLayout.SideBarLeft>
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
