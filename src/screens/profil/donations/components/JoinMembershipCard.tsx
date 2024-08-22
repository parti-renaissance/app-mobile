import Text from '@/components/base/Text'
import Button from '@/components/Button'
import VoxCard from '@/components/VoxCard/VoxCard'
import { Image } from 'expo-image'
import { styled, View, XStack, YStack } from 'tamagui'
import type { CommonMembershipCardProps } from './types'

const HeaderFrame = styled(XStack, {
  paddingLeft: 0,
  paddingRight: '$4.5',
  paddingBottom: '$4.5',
  paddingTop: '$8',
})

export default function (props: CommonMembershipCardProps) {
  return (
    <VoxCard>
      <HeaderFrame>
        <Image
          source={require('@/assets/images/cotisation/cotisation-illu.png')}
          style={{
            width: 241,
            height: 128,
          }}
        />
        <YStack gap="$3" pl="$4" flex={1}>
          <Text fontSize="$4" fontWeight="$6">
            Prenez part à la vie politique française !
          </Text>
          <Text fontSize="$3" color="$textSecondary">
            Adhérerez à Renaissance.
          </Text>
          <Button bg="$blue7">
            <Button.Text>J’adhère</Button.Text>
          </Button>
        </YStack>
      </HeaderFrame>
      <VoxCard.Content pt={0}>
        <VoxCard bg="$gray1" borderColor={'$colorTransparent'}>
          <VoxCard.Content>
            <Text fontWeight="$7">Pourquoi adhérer à Renaissance ?</Text>
            <Text>Je finance notre ancrage local</Text>
            <Text fontSize="$1" color="$textSecondary" lineHeight="$2">
              Les cotisations d’adhérents permettent de nous ancrer localement et durablement par une organisation décentralisée. Elles sont intégralement
              reversées aux Assemblées départementales qui sont autonômes budgétairement.
            </Text>

            <Text>Je deviens membre d’un Comité local</Text>
            <Text fontSize="$1" color="$textSecondary" lineHeight="$2">
              Les Comités locaux sont le plus petit échelon d’action politique locaux. Ils organisent les actions militantes et font vivre le Parti localement.
            </Text>

            <Text>Je prends part à notre orientation politique</Text>
            <Text fontSize="$1" color="$textSecondary" lineHeight="$2">
              Chaque année, les adhérents sont consultés sur des questions de fond comme ce fut le cas en 2023 concernant la réforme de nos institutions ou des
              questions européennes.
            </Text>

            <Text>Je participe aux élections internes</Text>
            <Text fontSize="$1" color="$textSecondary" lineHeight="$2">
              Chaque année, les adhérents sont consultés sur des questions de fond comme ce fut le cas en 2023 concernant la réforme de nos institutions ou des
              questions européennes.
            </Text>
          </VoxCard.Content>
        </VoxCard>
      </VoxCard.Content>
    </VoxCard>
  )
}
