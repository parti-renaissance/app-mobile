import { StackProps, YStack, YStackProps } from 'tamagui'

export default function Container({ children, ...props }: YStackProps) {
  return (
    <YStack alignItems="center" {...props}>
      <YStack maxWidth={1250} width="100%" flex={1}>
        {children}
      </YStack>
    </YStack>
  )
}
