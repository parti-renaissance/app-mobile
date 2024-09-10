import Badge from '@/components/Badge'
import Text from '@/components/base/Text'
import Button from '@/components/Button'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useOpenExternalContent } from '@/hooks/useOpenExternalContent'
import { getHumanFormattedDate } from '@/utils/date'
import { getYear } from 'date-fns'
import * as WebBrowser from 'expo-web-browser'
import { XStack, YStack } from 'tamagui'
import type { CommonMembershipCardProps } from './types'

export default function (props: CommonMembershipCardProps) {
  const { isPending, open: handleAdhesionLink } = useOpenExternalContent({ slug: 'adhesion' })
  return (
    <VoxCard bg="$white1">
      <VoxCard.Content>
        <YStack gap="$5" flex={1}>
          <XStack>
            <Badge theme="red">Cotisation à renouveler</Badge>
          </XStack>
          <XStack gap="$3">
            <YStack gap="$2" flex={1}>
              <Text fontWeight="$6">Renouvelez votre cotisation pour l’année {getYear(new Date())} pour garder vos droits d’adhérent.</Text>
              <Text color="$textSecondary">Dernière cotisation le {getHumanFormattedDate(props.last_membership_donation!)}</Text>
            </YStack>
            <YStack alignContent="center" height="100%" alignItems="center" justifyContent="center">
              <Button theme="blue" disabled={isPending} onPress={handleAdhesionLink}>
                <Button.Text>Me mettre à jour</Button.Text>
              </Button>
            </YStack>
          </XStack>
        </YStack>
        <VoxCard bg="$gray1" borderColor={'$colorTransparent'}>
          <VoxCard.Content>
            <Text fontWeight="$7">Pourquoi rester à jour de cotisation ?</Text>
            <Text>Je finance notre ancrage local</Text>
            <Text fontSize="$1" color="$textSecondary" lineHeight="$2">
              Les cotisations d’adhérents permettent de nous ancrer localement et durablement par une organisation décentralisée. Elles sont intégralement
              reversées aux Assemblées départementales qui sont autonômes budgétairement.
            </Text>

            <Text>Je prends part à notre orientation politique</Text>
            <Text fontSize="$1" color="$textSecondary" lineHeight="$2">
              Seuls les adhérents à jour de cotisation sont consultés sur des questions de fond comme ce fut le cas en 2023 concernant la réforme de nos
              institutions ou des questions européennes.
            </Text>

            <Text>Je participe aux élections internes</Text>
            <Text fontSize="$1" color="$textSecondary" lineHeight="$2">
              Seuls les adhérents à jour de cotisation peuvent participer à l’élection du Conseil national, du bureau de leur Assemblée départementale ou de
              celui de leur Comité.
            </Text>
          </VoxCard.Content>
        </VoxCard>
      </VoxCard.Content>
    </VoxCard>
  )
}
