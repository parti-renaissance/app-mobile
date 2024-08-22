import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import ProfilLayout from '@/components/layouts/ProfilLayout'
import * as metatags from '@/config/metatags'
import DonationScreen from '@/screens/profil/donations/page'
import Head from 'expo-router/head'

function PersonalInfoScreen() {
  return (
    <>
      <Head>
        <title>{metatags.createTitle('Cotisation et dons')}</title>
      </Head>

      <ProfilLayout>
        <BoundarySuspenseWrapper>
          <DonationScreen />
        </BoundarySuspenseWrapper>
      </ProfilLayout>
    </>
  )
}

export default PersonalInfoScreen
