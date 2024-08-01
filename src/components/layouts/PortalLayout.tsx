import { useSafeAreaInsets } from 'react-native-safe-area-context'
import VoxToast from '@/components/VoxToast/VoxToast'
import { ToastViewport } from '@tamagui/toast'
import { getTokenValue, PortalProvider } from 'tamagui'

export const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets()
  return (
    <PortalProvider>
      <VoxToast />
      <ToastViewport flexDirection="column" top={getTokenValue('$4', 'space') + insets.top} left={insets.left} right={insets.right} />
      {children}
    </PortalProvider>
  )
}
