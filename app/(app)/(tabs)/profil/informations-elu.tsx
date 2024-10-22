import React from 'react'
import ProfilLayout from '@/components/layouts/ProfilLayout'
import * as metatags from '@/config/metatags'
import EluScreen from '@/screens/profil/elu/page'
import Head from 'expo-router/head'

function CommunicationScreen() {
  return (
    <>
      <Head>
        <title>{metatags.createTitle('Communication')}</title>
      </Head>

      <ProfilLayout>
        <EluScreen />
      </ProfilLayout>
    </>
  )
}

export default CommunicationScreen
