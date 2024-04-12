import React from 'react'
import { Text, XStack, YStack, YStackProps } from 'tamagui'
import Button from './Button'

const DialogAuth = ({ children, title, ...props }: YStackProps & { title: string }) => {
  return (
    <YStack position="relative" {...props}>
      <YStack opacity={0.4} justifyContent="center">
        {children}
      </YStack>
      <YStack position="absolute" top="0" left="0" width="100%" height="100%" justifyContent="center" alignItems="center">
        <YStack bg="$white1" p="$4" borderRadius="$8" gap="$4" elevation={2}>
          <Text fontWeight="$5" fontSize="$5" maxWidth={300} textAlign="center">
            {title}
          </Text>
          <XStack justifyContent="center" gap="$4">
            <Button variant="text" size="lg">
              <Button.Text>Me connecter</Button.Text>
            </Button>
            <Button bg="$blue7" size="lg">
              <Button.Text>Creer un compte</Button.Text>
            </Button>
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  )
}

export default DialogAuth
