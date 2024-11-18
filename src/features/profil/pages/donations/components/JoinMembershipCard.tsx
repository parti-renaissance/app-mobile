import Text from '@/components/base/Text'
import Button, { VoxButton } from '@/components/Button'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useGetMagicLink } from '@/services/magic-link/hook'
import { Image } from 'expo-image'
import * as WebBrowser from 'expo-web-browser'
import { styled, XStack, YStack } from 'tamagui'
import type { CommonMembershipCardProps } from './types'

const HeaderFrame = styled(XStack, {
  padding: '$medium',
  paddingLeft: 0,
  gap: '$large',
})

export default function (props: CommonMembershipCardProps) {
  const { data: adhesionLink, isPending } = useGetMagicLink({ slug: 'adhesion' })
  return (
    <VoxCard bg={props.full ? 'white' : '$yellow1'} inside>
      <HeaderFrame>
        <Image
          source={require('@/features/profil/assets/cotisation-illu.png')}
          contentFit="contain"
          contentPosition={'left'}
          style={{
            width: '100%',
            flex: 1,
            flexBasis: 0,
          }}
        />
        <YStack gap="$medium" pl="$medium" flex={1} flexBasis={0} flexGrow={2} alignSelf={'flex-start'}>
          <YStack gap="$small">
            <Text.MD semibold>Prenez part à la vie politique française !</Text.MD>
            <Text.MD secondary>Adhérerez à Renaissance.</Text.MD>
          </YStack>
          <VoxButton
            theme="yellow"
            disabled={isPending}
            onPress={() => {
              if (adhesionLink) {
                WebBrowser.openBrowserAsync(adhesionLink.url)
              }
            }}
          >
            J’adhère
          </VoxButton>
        </YStack>
      </HeaderFrame>
      <VoxCard.Content pt={0} display={props.full ? 'flex' : 'none'}>
        <VoxCard bg="$gray1" borderColor={'$colorTransparent'}>
          <VoxCard.Content>
            <Text.MD bold>Pourquoi adhérer à Renaissance ?</Text.MD>
            <Text>Je finance notre ancrage local</Text>
            <Text.SM secondary multiline>
              Les cotisations d’adhérents permettent de nous ancrer localement et durablement par une organisation décentralisée. Elles sont intégralement
              reversées aux Assemblées départementales qui sont autonômes budgétairement.
            </Text.SM>

            <Text>Je deviens membre d’un Comité local</Text>
            <Text.SM secondary multiline>
              Les Comités locaux sont le plus petit échelon d’action politique locaux. Ils organisent les actions militantes et font vivre le Parti localement.
            </Text.SM>

            <Text>Je prends part à notre orientation politique</Text>
            <Text.SM secondary multiline>
              Chaque année, les adhérents sont consultés sur des questions de fond comme ce fut le cas en 2023 concernant la réforme de nos institutions ou des
              questions européennes.
            </Text.SM>

            <Text>Je participe aux élections internes</Text>
            <Text.SM secondary multiline>
              Chaque année, les adhérents sont consultés sur des questions de fond comme ce fut le cas en 2023 concernant la réforme de nos institutions ou des
              questions européennes.
            </Text.SM>
          </VoxCard.Content>
        </VoxCard>
      </VoxCard.Content>
    </VoxCard>
  )
}
