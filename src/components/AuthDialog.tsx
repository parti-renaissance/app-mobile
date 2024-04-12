import React from 'react'
import { useSession } from '@/ctx/SessionProvider'
import { BlurView } from 'expo-blur'
import { Text, XStack, YStack, YStackProps } from 'tamagui'
import Button from './Button'
import VoxCard from './VoxCard/VoxCard'

const DialogAuth = ({ children, title, ...props }: YStackProps & { title: string }) => {
  const { signIn } = useSession()
  return (
    <VoxCard bg="$colorTransparent" overflow="hidden" position="relative" {...props}>
      <YStack justifyContent="center">{children}</YStack>
      <BlurView
        intensity={20}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <YStack position="absolute" top="0" left="0" width="100%" height="100%" justifyContent="center" alignItems="center">
        <YStack bg="$white1" p="$4.5" borderRadius="$8" gap="$5" elevation={2}>
          <Text fontWeight="$7" fontSize="$2" maxWidth={300} textAlign="center">
            {title}
          </Text>
          <XStack justifyContent="center" gap="$4">
            <Button variant="text" size="md" onPress={signIn}>
              <Button.Text>Me connecter</Button.Text>
            </Button>
            <Button bg="$blue6" size="md">
              <Button.Text>Créer un compte</Button.Text>
            </Button>
          </XStack>
        </YStack>
      </YStack>
    </VoxCard>
  )
}

export default DialogAuth
