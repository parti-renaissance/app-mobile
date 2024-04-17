import { useCallback } from 'react'
import { Alert, Linking, Platform } from 'react-native'
import Title from '@/components/Title/Title'
import redirectToStore from '@/helpers/redirectToStore'
import useAppUpdate from '@/hooks/useAppUpdate'
import useAsyncFn from '@/hooks/useAsyncFn'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { reloadAsync } from 'expo-updates'
import { Button, Image, Spinner, Text, View, YStack } from 'tamagui'

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
        try {
          await reloadAsync()
        } catch (e) {
          ErrorMonitor.log(e)
        }
      }
    }, [isBuildUpdate]),
  )

  const isDisabled = isDownloading || isProcessing

  return (
    <View height="100%">
      <YStack alignItems="center" justifyContent="center" flex={1} gap={'$4'} p={'$5'}>
        <Image source={require('./assets/updateRefresh.png')} height={153} resizeMode="contain" />

        <Title>Mise à jour requise</Title>

        <Text fontFamily="$PublicSans" fontWeight="$5" fontSize="$2" textAlign="center">
          Votre version d’application est trop ancienne pour fonctionner correctement.
        </Text>
        <Text fontFamily="$PublicSans" fontWeight="$5" fontSize="$2" textAlign="center">
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
