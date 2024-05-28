import React, { useState } from 'react'
import Select from '@/components/base/Select/Select'
import { Stack } from 'tamagui'

export default {
  title: 'Select-2',
  component: Select,
  args: {
    label: 'Select-2',
    onChange: () => {},
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Opt 2' },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 3' },
      { value: '5', label: 'Option 5' },
    ],
    placeholder: 'Select an option',
  },
}

export function Default(args) {
  const [value, setValue] = useState(args.value)
  return (
    <Stack gap="$4" flex={1} height={200} width="100%">
      <Select {...args} onChange={setValue} value={value} label={args.label} />
    </Stack>
  )
}
