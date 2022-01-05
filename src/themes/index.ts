import React, { createContext } from 'react'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import { DefaultTheme } from './DefaultTheme'
import Theme from './Theme'

// Repackaging of "NamedStyles" used in the StyleSheet namespace (it's not exported)
type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }
type StyleSheetFactory<T extends NamedStyles<T> | NamedStyles<any>> = (
  theme: Theme,
) => T

export * from './DefaultTheme'

export interface ThemeHolder {
  theme: Theme
}

export const ThemeContext = createContext<ThemeHolder>({
  theme: DefaultTheme,
})

export const useTheme = () => React.useContext(ThemeContext)

export function useThemedStyles<T extends NamedStyles<T> | NamedStyles<any>>(
  factory: StyleSheetFactory<T>,
): T {
  return factory(useTheme().theme)
}
