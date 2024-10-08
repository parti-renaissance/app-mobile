import React from 'react'
import ProfilLayout from '@/components/layouts/ProfilLayout'
import * as metatags from '@/config/metatags'
import ChangePassScreen from '@/screens/profil/password/page'
import Head from 'expo-router/head'

function ChangePasswordScreen() {
  return (
    <>
      <Head>
        <title>{metatags.createTitle('Mot de passe')}</title>
      </Head>

      <ProfilLayout>
        <ChangePassScreen />
      </ProfilLayout>
    </>
  )
}

export default ChangePasswordScreen
