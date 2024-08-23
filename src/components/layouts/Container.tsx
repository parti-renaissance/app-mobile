import { StackProps, YStack, YStackProps } from 'tamagui'

export default function Container({ children, full, ...props }: YStackProps & { full?: boolean }) {
  return (
    <YStack alignItems="center" {...props}>
      <YStack maxWidth={!full ? 1300 : undefined} width="100%" flex={1}>
        {children}
      </YStack>
    </YStack>
  )
}
