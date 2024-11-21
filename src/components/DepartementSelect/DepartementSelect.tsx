import { useCallback } from 'react'
import Select from '@/components/base/Select/SelectV3'
import { InputProps } from '../base/Input/Input'
import { departements } from './departements'

interface DepartementSelectProps {
  value?: string
  onChange?: (value?: string) => void
  onDetailChange?: (payload?: { value: string; label: string }) => void
  label?: string
  id: string
  error?: string
  onBlur?: () => void
  placeholder?: string
  color?: InputProps['color']
  size?: InputProps['size']
}

const options = [
  { value: 'all', label: 'Toute' },
  ...departements.map(({ label, value }) => ({
    label: `${value} • ${label}`,
    value,
  })),
]

export default function DepartementSelect({ id, onChange, onDetailChange, value, ...props }: Readonly<DepartementSelectProps>) {
  const handleChange = useCallback(
    (value: string) => {
      if (value === 'all') {
        onChange?.(undefined)
      } else {
        onChange?.(value)
      }
    },
    [onChange],
  )

  const handleDetailChange = useCallback(
    (payload: { label: string; value: string }) => {
      if (payload.value === 'all') {
        onDetailChange?.(undefined)
      } else {
        onDetailChange?.(payload)
      }
    },
    [onDetailChange],
  )
  return (
    <Select
      label="Assemblée"
      key={id}
      searchable
      options={options}
      onChange={handleChange}
      onDetailChange={handleDetailChange}
      value={value ?? 'all'}
      {...props}
    />
  )
}
