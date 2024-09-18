import React from 'react'
import Badge from '@/components/Badge'
import RadioGroup from '@/components/base/RadioGroup/RadioGroup'
import Text from '@/components/base/Text'
import { VoxButton } from '@/components/Button'
import VoxCard from '@/components/VoxCard/VoxCard'
import { styled, XStack, YStack } from 'tamagui'
import type { CommonMembershipCardProps } from './types'

export default function (props: CommonMembershipCardProps & { full?: boolean }) {
  const [selected, setSelect] = React.useState('3')
  return (
    <VoxCard bg="$white1">
      <VoxCard.Content>
        <YStack gap="$5" flex={1}>
          <XStack>
            <Badge theme="orange">Adhésion impossible</Badge>
          </XStack>
          <XStack gap="$3">
            <YStack gap="$2" flex={1}>
              <Text.MD semibold>La double adhésion n’étant pas permise par Renaissance, il ne vous est pas possible d’adhérer.</Text.MD>
            </YStack>
            <YStack alignContent="center" height="100%" alignItems="center" justifyContent="center">
              <VoxButton theme="blue" disabled>
                J'adhère
              </VoxButton>
            </YStack>
          </XStack>
        </YStack>
        {props.full && (
          <YStack gap="$3">
            <VoxCard inside bg="$gray0">
              <VoxCard.Content>
                <YStack gap="$3">
                  <Text.MD semibold>Appartenance à un autre parti politique</Text.MD>
                  <RadioGroup
                    value={selected}
                    onChange={setSelect}
                    options={[
                      { label: 'Je certifie sur l’honneur que je n’appartiens à aucun autre parti politique', value: '0' },
                      {
                        label:
                          'Je suis membre de « Territoires de Progrès » et je peux bénéficier à ce titre de la double adhésion prévue dans les dispositions transitoires des status de Renaissance',
                        value: '1',
                      },
                      {
                        label:
                          'Je suis membre de « Territoires de Progrès » et je peux bénéficier à ce titre de la double adhésion prévue dans les dispositions transitoires des status de Renaissance',
                        value: '2',
                      },
                      {
                        label: "J'appartiens à un autre parti politique",
                        value: '3',
                      },
                    ]}
                  />
                </YStack>
              </VoxCard.Content>
            </VoxCard>
            <XStack justifyContent="flex-end" gap="$2">
              <VoxButton disabled variant="outlined">
                Annuler
              </VoxButton>
              <VoxButton theme="blue" disabled variant="outlined">
                Enregistrer
              </VoxButton>
            </XStack>
          </YStack>
        )}
      </VoxCard.Content>
    </VoxCard>
  )
}
