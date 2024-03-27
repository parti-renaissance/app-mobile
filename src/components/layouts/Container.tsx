import { getConfig, getMedia, getTokenValue, mediaObjectToString, mediaQueryConfig, Stack, StackProps } from 'tamagui'

export default function Container({ children, ...props }: StackProps) {
  return (
    <Stack alignItems="center" {...props}>
      <Stack maxWidth={1250} width="100%" flex={1}>
        {children}
      </Stack>
    </Stack>
  )
}
