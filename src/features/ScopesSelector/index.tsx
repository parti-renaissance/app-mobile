import { useCallback, useMemo, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Text from '@/components/base/Text'
import { VoxButton } from '@/components/Button'
import { useGetExecutiveScopes, useMutateExecutiveScope } from '@/services/profile/hook'
import { ArrowRight } from '@tamagui/lucide-icons'
import { difference } from 'lodash'
import { Image, useMedia, XStack, YStack } from 'tamagui'
import { ScopeItem } from './components/ScopeItem'
import { ScopeList } from './components/ScopeList'
import ModalOrPageV2, { useModalOrPageScrollView } from './components/ViewportModal'
import { getFormatedScope } from './utils'

const tutoNavMobileImg = require('@/features/ScopesSelector/assets/mobile-nav-tuto.png')
const tutoNavDesktopImg = require('@/features/ScopesSelector/assets/sidebar-tuto.png')

export default function ScopesSelector() {
  const { data: scopes } = useGetExecutiveScopes()
  const { mutate: mutateScope } = useMutateExecutiveScope()
  const [selectedScope, setSelectedScope] = useState(scopes.default.code)
  const [hasSelectedScope, setHasSelectedScope] = useState(false)
  const [userConfirm, setUserConfirm] = useState(false)
  const scopesCodeList = useMemo(() => scopes.list.map((scope) => scope.code), [scopes])
  const ScrollView = useModalOrPageScrollView()
  const media = useMedia()

  const handleSubmit = (confirm?: boolean) => () => {
    mutateScope({
      scope: selectedScope,
      lastAvailableScopes: scopesCodeList,
    })
    setHasSelectedScope(true)
    setUserConfirm(Boolean(confirm))
  }

  const handleChange = (scope: string) => {
    setSelectedScope(scope)
  }

  const shouldOpen = useMemo(() => {
    return (
      !scopes.lastAvailableScopes ||
      scopes.lastAvailableScopes.length === 0 ||
      difference(scopesCodeList, scopes.lastAvailableScopes).length > 0 ||
      !userConfirm
    )
  }, [scopes, userConfirm, scopesCodeList])

  console.log('shouldOpen', shouldOpen)

  const MultiScopeStep = useCallback(() => {
    return (
      <YStack
        $gtSm={{
          width: 390,
        }}
        gap="$medium"
      >
        <YStack>
          <YStack p="$medium" borderBottomWidth={1} borderBottomColor="$textOutline">
            <Text.LG multiline semibold>
              Vous avez plusieurs rôles Cadre
            </Text.LG>
            <Text.SM>Choisissez en un principal.</Text.SM>
          </YStack>
          <ScopeList scopes={scopes.list} onChange={handleChange} value={selectedScope} />
        </YStack>
        <YStack p="$medium" pt={0} alignItems="center" gap="$medium">
          <Text.SM>Vos fonctonnalités de cadre sont indiquées en violet dans votre espace Militant.</Text.SM>
          <XStack>
            <VoxButton theme="purple" pop iconRight={ArrowRight} onPress={handleSubmit()}>
              Continuer
            </VoxButton>
          </XStack>
        </YStack>
      </YStack>
    )
  }, [scopes, selectedScope, handleChange, handleSubmit])

  const HeaderOneScope = () => {
    const { name, description } = getFormatedScope(scopes.list.find((x) => x.code === selectedScope)!)
    return (
      <YStack backgroundColor="$purple1" paddingVertical="$xxlarge" paddingHorizontal="$large">
        <ScopeItem title={name} pop description={description} showButton={false} selected />
      </YStack>
    )
  }

  const OneScopeStep = () => {
    return (
      <YStack
        $gtSm={{
          width: 390,
        }}
        gap="$medium"
      >
        <HeaderOneScope />
        <YStack gap="$medium" paddingHorizontal="$medium">
          <Text.LG semibold>Vous avez un rôle Cadre</Text.LG>
          <Text.SM multiline>Il vous ouvre des fonctionnalités Cadre qui sont indiquées en violet dans votre espace Militant.</Text.SM>
          <Text.SM multiline>Et l’accès à l’espace Cadre depuis le volet gauche de la page d’accueil.</Text.SM>
          <YStack p="$medium" pt={0} alignItems="center" gap="$medium">
            <Image source={media.gtSm ? tutoNavDesktopImg : tutoNavMobileImg} />
            <XStack paddingVertical="$medium">
              <VoxButton theme="purple" pop iconRight={ArrowRight} onPress={handleSubmit(true)}>
                C'est noté !
              </VoxButton>
            </XStack>
          </YStack>
        </YStack>
      </YStack>
    )
  }

  const FirstStep = () => (scopesCodeList.length > 1 ? <MultiScopeStep /> : <OneScopeStep />)

  const SecondStep = () => {
    return (
      <YStack
        $gtSm={{
          width: 390,
        }}
        gap="$medium"
      >
        <HeaderOneScope />
        <YStack gap="$medium" paddingHorizontal="$medium">
          <Text.LG semibold>C’est maintenant votre rôle principal sur cet appareil</Text.LG>
          <Text.SM multiline>Il vous ouvre des fonctionnalités Cadre qui sont indiquées en violet dans votre espace Militant.</Text.SM>
          <Text.SM multiline>Et l’accès à l’espace Cadre depuis le volet gauche de la page d’accueil.</Text.SM>
          <YStack pt={0} gap="$medium">
            <Image p="$medium" source={media.gtSm ? tutoNavDesktopImg : tutoNavMobileImg} />
            <Text.SM>Vous pouvez changer de rôle principal à tout moment depuis votre profil.</Text.SM>
            <XStack alignSelf="center" paddingVertical="$medium">
              <VoxButton theme="purple" pop iconRight={ArrowRight} onPress={() => setUserConfirm(true)}>
                C'est noté !
              </VoxButton>
            </XStack>
          </YStack>
        </YStack>
      </YStack>
    )
  }

  return (
    <ModalOrPageV2 open={shouldOpen}>
      <YStack maxHeight={800} flex={1}>
        <ScrollView>{!hasSelectedScope ? <FirstStep /> : <SecondStep />}</ScrollView>
      </YStack>
    </ModalOrPageV2>
  )
}
