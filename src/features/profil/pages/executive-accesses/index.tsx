import React, { useMemo, useState } from 'react'
import Text from '@/components/base/Text'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import VoxCard from '@/components/VoxCard/VoxCard'
import { HelpingHand, Sparkle } from '@tamagui/lucide-icons'
import { ScrollView, useMedia, XStack } from 'tamagui'
import ChangeScope from './components/ScopeList'

const ExecutivesAccessesScreen = () => {
  const media = useMedia()

  const scrollViewContainerStyle = useMemo(
    () => ({
      pt: media.gtSm ? '$medium' : undefined,
      pl: media.gtSm ? '$medium' : undefined,
      pr: media.gtSm ? '$medium' : undefined,
      pb: '$11',
    }),
    [media],
  )
  return (
    <PageLayout.MainSingleColumn>
      <ScrollView {...scrollViewContainerStyle}>
        <VoxCard>
          <VoxCard.Content>
            <XStack gap={6} alignItems="center">
              <Sparkle size={20} />
              <XStack width="100%" flexShrink={1}>
                <Text.LG multiline semibold>
                  Mes rôles cadres
                </Text.LG>
              </XStack>
            </XStack>
            <Text.P>
              Votre compte dispose de plusieurs accès « cadres » vous donnant accès à des ressources supplémentaires comme la gestion des événements et des
              actions ou l’envoi d’emails. Chaque accès est associé à un rôle (ex : Président ») et une zone de gestion (ex : le Var) sur laquelle il est
              limité.
            </Text.P>
            <Text.P>
              Un seul de vos accès est défini comme par défaut et est utilisé dans l’interface. Vous pouvez changer cet accès par défaut ou en utiliser un autre
              ponctuellement à la création d’un événement, d’une action ou d’un email.
            </Text.P>
            <ChangeScope />
          </VoxCard.Content>
        </VoxCard>
      </ScrollView>
    </PageLayout.MainSingleColumn>
  )
}

export default ExecutivesAccessesScreen
