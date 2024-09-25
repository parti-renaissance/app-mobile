import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import AppDownloadCTA from '@/components/ProfileCards/AppDownloadCTA/AppDownloadCTA'
import ProcurationCTA from '@/components/ProfileCards/ProcurationCTA/ProcurationCTA'
import * as metatags from '@/config/metatags'
import EditInformations from '@/screens/profil/account/page'
import ProfilMenu from '@/screens/profil/menu/Menu'
import { useMedia, View, XStack, YStack } from 'tamagui'
import PageLayout from './PageLayout/PageLayout'

export default function ProfilLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout>
      <PageLayout.SideBarLeft showOn="gtSm">
        <XStack justifyContent="flex-end">
          <ProfilMenu />
        </XStack>
      </PageLayout.SideBarLeft>
      <PageLayout.MainSingleColumn>{children}</PageLayout.MainSingleColumn>
      <PageLayout.SideBarRight />
    </PageLayout>
  )
}
