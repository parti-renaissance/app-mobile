import React from 'react'
import Text from '@/components/base/Text'
import { BlurView } from 'expo-blur'
import { XStack, YStack, YStackProps } from 'tamagui'
import { SignInButton, SignUpButton } from './Buttons/AuthButton'
import VoxCard from './VoxCard/VoxCard'

const DialogAuth = ({ children, title, ...props }: YStackProps & { title: string }) => {
  return (
    <VoxCard bg="$colorTransparent" overflow="hidden" position="relative" {...props}>
      <YStack justifyContent="center">{children}</YStack>
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={20}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <YStack position="absolute" top={0} left={0} width="100%" height="100%" justifyContent="center" alignItems="center">
        <YStack bg="$white1" p="$4.5" borderRadius="$8" gap="$5" elevation={2}>
          <Text fontWeight="$7" maxWidth={300} textAlign="center">
            {title}
          </Text>
          <XStack justifyContent="center" gap="$4">
            <SignInButton />
            <SignUpButton />
          </XStack>
        </YStack>
      </YStack>
    </VoxCard>
  )
}

export default DialogAuth
