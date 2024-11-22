import { Info } from '@tamagui/lucide-icons'
import { Toast, useToastState } from '@tamagui/toast'
import { isWeb, ThemeName, XStack, YStack } from 'tamagui'
import Text from '../base/Text'
import VoxCard from '../VoxCard/VoxCard'

const getThemeByType = (type: 'error' | 'success' | 'info' | 'warning'): ThemeName => {
  switch (type) {
    case 'error':
      return 'orange'
    case 'success':
      return 'green'
    case 'info':
      return 'blue'
    case 'warning':
      return 'yellow'
    default:
      return 'gray'
  }
}

const VoxToast = () => {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) return null
  const type = currentToast.type as 'error' | 'success' | 'info' | 'warning'
  const theme = getThemeByType(type)
  const bgColor = '$color5'
  const textColor = '$white1'
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      opacity={1}
      alignSelf="center"
      scale={1}
      animation="100ms"
      bg={bgColor}
      padding={0}
      borderRadius={999}
      height="auto"
      theme={theme}
      viewportName={currentToast.viewportName}
    >
      <Toast.Close asChild={!isWeb}>
        <VoxCard.Content paddingVertical={10}>
          <XStack gap={10} justifyContent="space-between" alignContent="center" alignItems="center" position="relative">
            <Info size={20} color={textColor} />
            <YStack>
              {currentToast.title.length > 0 && (
                <Text.SM semibold color={textColor} top={5} left={45}>
                  {currentToast.title}
                </Text.SM>
              )}
              {!!currentToast.message && (
                <Text.LG multiline color={textColor}>
                  {currentToast.message}
                </Text.LG>
              )}
            </YStack>
          </XStack>
        </VoxCard.Content>
      </Toast.Close>
    </Toast>
  )
}

export default VoxToast
