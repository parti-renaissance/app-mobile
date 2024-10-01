import React, { useEffect } from 'react'
import ProfilLayout from '@/components/layouts/ProfilLayout'
import * as metatags from '@/config/metatags'
import DashboardScreen from '@/screens/profil/dashboard/page'
import Head from 'expo-router/head'

function ProfilScreen() {
  return (
    <>
      <Head>
        <title>{metatags.createTitle('Mon profil')}</title>
      </Head>

      <ProfilLayout>
        <DashboardScreen />
      </ProfilLayout>
    </>
  )
}

export default ProfilScreen
