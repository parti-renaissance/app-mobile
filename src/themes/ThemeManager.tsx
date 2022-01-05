import React, { FunctionComponent } from 'react'
import { DefaultTheme, ThemeContext } from '.'

type Props = Readonly<{ children: any }>

const ThemeManager: FunctionComponent<Props> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme: DefaultTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeManager
