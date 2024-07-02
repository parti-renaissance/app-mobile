import * as React from 'react'
import { Platform } from 'react-native'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import LocalStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import useAsyncState, { UseStateHook } from './useAsyncState'

const isTWA = Platform.OS === 'web' && window?.Telegram?.WebApp.initData

export async function setStorageItemAsync(key: string, value: string | null) {
  if (isTWA) {
    try {
      if (value === null) {
        return new Promise((resolve, reject) =>
          window.Telegram.WebApp.CloudStorage.removeItem(key, (error, success) => {
            if (error) {
              reject(new Error(error))
            }
            if (success) {
              resolve(success)
            }
          }),
        )
      } else {
        return new Promise((resolve, reject) =>
          window.Telegram.WebApp.CloudStorage.setItem(key, value, (error, success) => {
            if (error) {
              reject(new Error(error))
            }
            if (success) {
              resolve(success)
            }
          }),
        )
      }
    } catch (e) {
      ErrorMonitor.log('Telegram CloudStorage is unavailable:', e)
      console.error('Telegram CloudStorage is unavailable:', e)
    }
  } else if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, value)
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e)
    }
  } else if (value == null) {
    await SecureStore.deleteItemAsync(key)
  } else {
    await SecureStore.setItemAsync(key, value)
  }
}

export async function getStorageItemAsync(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key)
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e)
    }
  } else {
    return SecureStore.getItemAsync(key)
  }

  return null
}

export async function removeStorageItemAsync(key: string) {
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key)
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e)
    }
  } else {
    SecureStore.deleteItemAsync(key)
  }
}

export const AsyncStorage = {
  secure: {
    setItem: setStorageItemAsync,
    getItem: getStorageItemAsync,
    removeItem: removeStorageItemAsync,
  },
  ...LocalStorage,
}

export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>()

  // Get
  React.useEffect(() => {
    AsyncStorage.secure.getItem(key).then((value) => {
      setState(value)
    })
  }, [key])

  // Set
  const setValue = React.useCallback(
    (value: string | null) => {
      setState(value)
      setStorageItemAsync(key, value)
    },
    [key],
  )

  return [state, setValue]
}
