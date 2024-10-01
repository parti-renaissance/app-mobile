import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import ProfilLayout from '@/components/layouts/ProfilLayout'
import * as metatags from '@/config/metatags'
import ComScreen from '@/screens/profil/communications/page'
import Head from 'expo-router/head'

function CommunicationScreen() {
  return (
    <>
      <Head>
        <title>{metatags.createTitle('Cotisation et dons')}</title>
      </Head>

      <ProfilLayout>
        <ComScreen />
      </ProfilLayout>
    </>
  )
}

export default CommunicationScreen
