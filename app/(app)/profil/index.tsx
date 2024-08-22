import React, { useEffect } from 'react'
import ProfilLayout from '@/components/layouts/ProfilLayout'
import * as metatags from '@/config/metatags'
import ProfilMenu from '@/screens/profil/menu/Menu'
import { Redirect, router } from 'expo-router'
import Head from 'expo-router/head'
import { ScrollView, useMedia, YStack } from 'tamagui'

function ProfilScreen() {
  const media = useMedia()
  if (media.gtSm) return <Redirect href="/profil/cotisation-et-dons" />

  return (
    <>
      <Head>
        <title>{metatags.createTitle('Mon profil')}</title>
      </Head>

      <ProfilLayout>
        <ScrollView flex={1} width="100%">
          <ProfilMenu />
        </ScrollView>
      </ProfilLayout>
    </>
  )
}

export default ProfilScreen
