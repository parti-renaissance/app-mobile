import React from 'react'
import ProfilLayout from '@/components/layouts/ProfilLayout'
import * as metatags from '@/config/metatags'
import InstancesScreen from '@/screens/profil/instances/page'
import Head from 'expo-router/head'

function ChangePasswordScreen() {
  return (
    <>
      <Head>
        <title>{metatags.createTitle('Mes instances')}</title>
      </Head>

      <ProfilLayout>
        <InstancesScreen />
      </ProfilLayout>
    </>
  )
}

export default ChangePasswordScreen
