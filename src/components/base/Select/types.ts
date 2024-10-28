import { NamedExoticComponent } from 'react'
import { IconProps } from '@tamagui/helpers-icon'

export type ModalDropDownRef = {
  open: () => void
  close: () => void
}

export type SelectProps<A extends string> = {
  value?: A
  options: Array<{ value: A; label: string }>
  onChange?: (value: A) => void
  onBlur?: () => void
  disabled?: boolean
  error?: string
  label?: string
  placeholder?: string
  searchable?: boolean
  searchableOptions?: {
    placeholder?: string
    noResults?: string
    icon?: NamedExoticComponent<IconProps>
  }
  color?: 'gray' | 'white'
}
