import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import ProfilLayout from '@/components/layouts/ProfilLayout'
import * as metatags from '@/config/metatags'
import EditInformations from '@/screens/profil/account/page'
import Head from 'expo-router/head'

function PersonalInfoScreen() {
  return (
    <>
      <Head>
        <title>{metatags.createTitle('Mes informations')}</title>
      </Head>

      <ProfilLayout>
        <EditInformations />
      </ProfilLayout>
    </>
  )
}

export default PersonalInfoScreen
