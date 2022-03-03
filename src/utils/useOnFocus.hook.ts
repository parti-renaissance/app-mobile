import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'

export const useOnFocus = (focusEffect: () => void) => {
  const navigation = useNavigation()
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      focusEffect()
    })
    return unsubscribe
  }, [navigation, focusEffect])
}
