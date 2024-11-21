import { NamedExoticComponent } from 'react'
import { IconProps } from '@tamagui/helpers-icon'
import { InputProps } from '../Input/Input'

export type ModalDropDownRef = {
  open: () => void
  close: () => void
}

export type SelectProps<A extends string> = {
  value?: A
  options: Readonly<Array<{ value: A; label: string }>>
  onChange?: (value: A) => void
  onDetailChange?: (value: { value: A; label: string }) => void
  onBlur?: () => void
  disabled?: boolean
  error?: string
  label?: string
  placeholder?: string
  size?: InputProps['size']
  searchable?: boolean
  searchableOptions?: {
    placeholder?: string
    noResults?: string
    icon?: NamedExoticComponent<IconProps>
  }
  resetable?: boolean
  color?: 'gray' | 'white'
}
