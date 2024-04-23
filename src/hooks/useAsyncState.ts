import { useReducer } from 'react'

export type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void]

export default function useAsyncState<T>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> {
  return useReducer((state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action], initialValue) as UseStateHook<T>
}
