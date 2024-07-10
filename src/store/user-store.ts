import { AsyncStorage } from '@/hooks/useStorageState'
import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  accessToken: string
  refreshToken?: string
}

interface UserState {
  user: User | null
  setCredentials: (user: User) => void
  removeCredentials: () => void
}

const userStoreSlice: StateCreator<UserState> = (set) => ({
  user: null,
  setCredentials: (user) => set({ user }),
  removeCredentials: () => set({ user: null }),
})

const persistedUserStore = persist<UserState>(userStoreSlice, {
  name: 'user',
  getStorage: () => AsyncStorage,
})

export const useUserStore = create(persistedUserStore)
