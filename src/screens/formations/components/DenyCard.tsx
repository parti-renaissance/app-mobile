import { Fragment } from 'react'
import Text from '@/components/base/Text'
import { VoxButton } from '@/components/Button'
import VoxCard from '@/components/VoxCard/VoxCard'
import { FormationScreenProps } from '@/screens/formations/types'
import { useGetMagicLink } from '@/services/magic-link/hook'
import { Href, Link } from 'expo-router'
import { Image, isWeb, XStack, YStack } from 'tamagui'

export const FormationDenyCard: FormationScreenProps = (props) => {
  const { data: adhesionLink, isPending } = useGetMagicLink({ slug: 'adhesion' })
  const MaybeLink = ({ children }: { children: React.ReactNode }) => {
    if (adhesionLink?.url && !isPending) {
      return (
        <Link href={adhesionLink.url as Href<string>} asChild={!isWeb} target="_blank">
          {children}
        </Link>
      )
    }
    return <Fragment>{children}</Fragment>
  }
  return (
    <VoxCard.Content>
      <YStack alignItems="center" justifyContent="center" paddingVertical="$xxlarge" gap="$xlarge">
        <Image src={require('@/assets/illustrations/VisuCadnas.png')} />
        <Text.LG>Les formations sont réservées aux adhérents.</Text.LG>
        <XStack>
          <MaybeLink>
            <VoxButton loading={isPending} theme="yellow">
              J'adhère dès maintenant !
            </VoxButton>
          </MaybeLink>
        </XStack>
      </YStack>
    </VoxCard.Content>
  )
}
