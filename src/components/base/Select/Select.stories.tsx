import React, { useState } from 'react'
import Select from '@/components/base/Select/SelectV3'
import { Stack } from 'tamagui'

const props = {
  label: 'Select-2',
  onChange: () => {},
  value: '1',
  options: [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Opt 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 3' },
    { value: '5', label: 'Option 5' },
  ],
  placeholder: 'Select an option',
}

export default {
  title: 'Select-2',
  component: Select,
  args: props,
}

export function Default(args: typeof props) {
  const [value, setValue] = useState(args.value)
  return (
    <Stack gap="$medium" flex={1} height={200} width="100%">
      <Select {...args} onChange={setValue} value={value} label={args.label} />
    </Stack>
  )
}
