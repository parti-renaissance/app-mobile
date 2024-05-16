import { useColorScheme } from 'react-native'
import Error404 from '@/components/404/Error404'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { TamaguiProvider } from '@tamagui/core'
import { Unmatched } from 'expo-router'

// export default function UnmatchedRoute() {
//   const colorScheme = useColorScheme()

//   return (
//     <TamaguiProvider>
//       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//         <Error404 />
//       </ThemeProvider>
//     </TamaguiProvider>
//   )
// }

export default Unmatched
