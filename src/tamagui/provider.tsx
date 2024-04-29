import React from 'react'
import { TamaguiProvider } from '@tamagui/core'
import { config } from '../../tamagui.config'

export default ({ children }) => (
  <TamaguiProvider config={config} defaultTheme="light">
    {children}
  </TamaguiProvider>
)
