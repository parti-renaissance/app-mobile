import { Toast, useToastState } from '@tamagui/toast'
import { YStack } from 'tamagui'
import Text from '../base/Text'

const VoxToast = () => {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) return null
  const type = currentToast.type as 'error' | 'success' | 'info' | 'warning'
  const bgColor = type === 'error' ? '$red2' : type === 'success' ? '$green2' : type === 'info' ? '$blue2' : type === 'warning' ? '$yellow2' : '$gray2'
  const textColor =
    type === 'error' ? '$red11' : type === 'success' ? '$green11' : type === 'info' ? '$blue11' : type === 'warning' ? '$yellow11' : '$textPrimary'
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      bg={bgColor}
      borderRadius="$12"
      opacity={1}
      alignSelf="center"
      scale={1}
      p="$5"
      animation="100ms"
      viewportName={currentToast.viewportName}
    >
      <YStack>
        <Text color={textColor} textAlign="center" fontWeight="$6" fontSize="$3" lineHeight="$2" fontFamily="$PublicSans">
          {currentToast.title}
        </Text>
        {!!currentToast.message && (
          <Text color={textColor} fontWeight="$5" fontSize="$1" lineHeight="$1" fontFamily="$PublicSans">
            {currentToast.message}
          </Text>
        )}
      </YStack>
    </Toast>
  )
}

export default VoxToast
