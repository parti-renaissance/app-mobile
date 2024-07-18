import { useCallback } from 'react'
import Text from '@/components/base/Text'
import Title from '@/components/Title/Title'
import redirectToStore from '@/helpers/redirectToStore'
import useAppUpdate from '@/hooks/useAppUpdate'
import useAsyncFn from '@/hooks/useAsyncFn'
import { reloadAsync } from 'expo-updates'
import { Button, Image, Spinner, View, YStack } from 'tamagui'

interface Props {
  isBuildUpdate?: boolean
}

export default function UpdateScreen({ isBuildUpdate = false }: Props) {
  const { isDownloading } = useAppUpdate()
  const { isProcessing, trigger: onUpdate } = useAsyncFn(
    useCallback(async () => {
      if (isBuildUpdate) {
        await redirectToStore()
      } else {
        await reloadAsync()
      }
    }, []),
  )

  const isDisabled = isProcessing || isDownloading

  return (
    <View height="100%">
      <YStack alignItems="center" justifyContent="center" flex={1} gap={'$4'} p={'$5'}>
        <Image source={require('./assets/updateRefresh.png')} height={153} objectFit="contain" />

        <Title>Mise à jour requise</Title>

        <Text fontWeight="$5" textAlign="center">
          Votre version d’application est trop ancienne pour fonctionner correctement.
        </Text>
        <Text fontWeight="$5" textAlign="center">
          Mettez à jour votre application pour découvrir les nouveautés.
        </Text>
      </YStack>

      <YStack p={'$5'} mb={'$2'}>
        <Button
          onPress={onUpdate}
          height={44}
          width={'100%'}
          icon={isDisabled ? <Spinner color={textColor} /> : undefined}
          backgroundColor={'$gray8'}
          color={textColor}
          disabled={isDisabled}
          opacity={isDisabled ? 0.5 : 1}
          fontSize={'$3'}
        >
          Mettre à jour
        </Button>
      </YStack>
    </View>
  )
}

const textColor = '$white1'
