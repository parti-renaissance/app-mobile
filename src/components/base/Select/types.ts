import { ComponentProps, NamedExoticComponent } from 'react'
import type Text from '@/components/base/Text'
import { IconProps } from '@tamagui/helpers-icon'
import { InputProps } from '../Input/Input'

export type ModalDropDownRef = {
  open: () => void
  close: () => void
}

export type SelectProps<A extends string> = {
  value?: A
  options: Readonly<Array<{ value: A; label: string; subLabel?: string }>>
  onChange?: (value: A) => void
  onDetailChange?: (value: { value: A; label: string; subLabel?: string }) => void
  onBlur?: () => void
  disabled?: boolean
  error?: string
  label?: string
  placeholder?: string
  size?: InputProps['size']
  searchable?: boolean
  multiline?: boolean
  color?: InputProps['color']
  customTextComponent?: (x: ComponentProps<typeof Text>) => React.ReactNode
  searchableOptions?: {
    placeholder?: string
    noResults?: string
    icon?: NamedExoticComponent<IconProps>
  }
  resetable?: boolean
}
