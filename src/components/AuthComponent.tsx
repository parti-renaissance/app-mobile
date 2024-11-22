import React from 'react'
import Text from '@/components/base/Text'
import { XStack, YStack, YStackProps } from 'tamagui'
import { SignInButton, SignUpButton } from './Buttons/AuthButton'

const AuthComponent = ({ children, ...props }: YStackProps) => {
  return (
    <YStack gap={24} {...props}>
      <Text.MD semibold multiline maxWidth={300} textAlign="center" color="$textSecondary">
        {children}
      </Text.MD>
      <XStack justifyContent="space-between" alignItems="center" gap="$medium">
        <SignInButton />
        <SignUpButton />
      </XStack>
    </YStack>
  )
}

export default AuthComponent
