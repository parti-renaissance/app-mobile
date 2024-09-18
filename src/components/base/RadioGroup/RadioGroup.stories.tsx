import React from 'react'
import { YStack } from 'tamagui'
import RadioGroup from './RadioGroup'

export default {
  title: 'RadioGroup',
  component: RadioGroup,
}

const list = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
]

export const Default = () => {
  const [value, setValue] = React.useState('option1')
  return <RadioGroup options={list} value={value} onChange={setValue} />
}
