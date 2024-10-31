import TamaguiProvider from '@/tamagui/provider'
import * as testing from '@testing-library/react-native'

export const render: typeof testing.render = (ui) => {
  return testing.render(<TamaguiProvider>{ui}</TamaguiProvider>)
}
