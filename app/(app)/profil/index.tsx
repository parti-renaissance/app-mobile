import React from 'react'
import ProfilLayout from '@/components/layouts/ProfilLayout'
import * as metatags from '@/config/metatags'
import ProfilMenu from '@/screens/profil/menu/Menu'
import { Redirect } from 'expo-router'
import Head from 'expo-router/head'
import { useMedia } from 'tamagui'

function ProfilScreen() {
  const media = useMedia()
  if (media.gtSm) return <Redirect href="/profil/informations-personnelles" />

  return (
    <>
      <Head>
        <title>{metatags.createTitle('Mon profil')}</title>
      </Head>

      <ProfilLayout>
        <ProfilMenu />
      </ProfilLayout>
    </>
  )
}

export default ProfilScreen
