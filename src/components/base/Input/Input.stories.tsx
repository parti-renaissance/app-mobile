import { Stack } from 'tamagui'
import Input from './Input'

export default {
  title: 'Input',
  component: Input,
}

export function Default() {
  return (
    <Stack gap="$4">
      <Input />
      <Input error="une erreur" />
    </Stack>
  )
}
export function Minimal() {
  return (
    <Stack gap="$4">
      <Input minimal />
      <Input minimal error="une erreur" />
    </Stack>
  )
}
