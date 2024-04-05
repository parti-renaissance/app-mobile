import { Stack } from 'tamagui'
import Button from './Button'

export default {
  title: 'Button',
  component: Button,
}

export function Default() {
  return (
    <Button>
      <Button.Text>{'Button'}</Button.Text>
    </Button>
  )
}

export function Size() {
  return (
    <Stack gap="$4">
      <Button size="sm">
        <Button.Text>{'Button'}</Button.Text>
      </Button>

      <Button size="md" variant="outlined">
        <Button.Text>{'Button'}</Button.Text>
      </Button>

      <Button size="lg">
        <Button.Text>{'Button'}</Button.Text>
      </Button>
    </Stack>
  )
}

export function Variant() {
  return (
    <Stack gap="$4">
      <Button variant="contained">
        <Button.Text>{'Button'}</Button.Text>
      </Button>

      <Button variant="outlined">
        <Button.Text>{'Button'}</Button.Text>
      </Button>

      <Button variant="text">
        <Button.Text>{'Button'}</Button.Text>
      </Button>
    </Stack>
  )
}

export function Disabled() {
  return (
    <Stack gap="$4">
      <Button disabled variant="contained">
        <Button.Text>{'Button'}</Button.Text>
      </Button>

      <Button disabled variant="outlined">
        <Button.Text>{'Button'}</Button.Text>
      </Button>

      <Button disabled variant="text">
        <Button.Text>{'Button'}</Button.Text>
      </Button>
    </Stack>
  )
}

export function Loading() {
  return (
    <Button loading>
      <Button.Text>{'Button'}</Button.Text>
    </Button>
  )
}
