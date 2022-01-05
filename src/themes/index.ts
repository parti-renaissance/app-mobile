import React, { createContext } from 'react'
import { DefaultTheme } from './DefaultTheme'
import Theme from './Theme'

export * from './DefaultTheme'

export interface ThemeHolder {
  theme: Theme
}

export const ThemeContext = createContext<ThemeHolder>({
  theme: DefaultTheme,
})

export const useTheme = () => React.useContext(ThemeContext)
