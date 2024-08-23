import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import ProfilLayout from '@/components/layouts/ProfilLayout'
import * as metatags from '@/config/metatags'
import EluScreen from '@/screens/profil/elu/page'
import Head from 'expo-router/head'

function InformationsEluScreen() {
  return (
    <>
      <Head>
        <title>{metatags.createTitle('Cotisation et dons')}</title>
      </Head>

      <ProfilLayout>
        <BoundarySuspenseWrapper>
          <EluScreen />
        </BoundarySuspenseWrapper>
      </ProfilLayout>
    </>
  )
}

export default InformationsEluScreen
