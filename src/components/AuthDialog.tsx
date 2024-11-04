import React from 'react'
import Text from '@/components/base/Text'
import { XStack, YStack, YStackProps } from 'tamagui'
import { SignInButton, SignUpButton } from './Buttons/AuthButton'
import VoxCard from './VoxCard/VoxCard'

const DialogAuth = ({ children, title, ...props }: YStackProps & { title: string }) => {
  return (
    <VoxCard bg="$colorTransparent" overflow="hidden" position="relative" {...props}>
      <YStack justifyContent="center">{children}</YStack>
      <YStack
        backgroundColor="$gray/16"
        style={{
          position: 'absolute',
          zIndex: 0,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <YStack position="absolute" top={0} left={0} width="100%" height="100%" justifyContent="center" alignItems="center">
        <YStack bg="$white1" p={24} borderRadius={16} gap={24} maxWidth={300} borderColor="$textOutline" borderWidth={4}>
          <Text.MD semibold multiline maxWidth={300} textAlign="center" color="$textSecondary">
            {title}
          </Text.MD>
          <XStack justifyContent="space-between" alignItems="center" gap={16}>
            <SignInButton />
            <SignUpButton />
          </XStack>
        </YStack>
      </YStack>
    </VoxCard>
  )
}

export default DialogAuth
