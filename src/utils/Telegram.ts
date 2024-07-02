import { Platform } from 'react-native'

export const isTWA = Platform.OS === 'web' && window?.Telegram?.WebApp.initData
