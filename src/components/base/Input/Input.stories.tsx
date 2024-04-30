import { Lock } from '@tamagui/lucide-icons'
import { Stack } from 'tamagui'
import Input from './Input'

export default {
  title: 'Input',
  component: Input,
}

export function Default() {
  return (
    <Stack gap="$4">
      <Input placeholder="Je suis une placeholder" label="je suis un label" info="Je suis une info" />
      <Input placeholder="Je suis un input qui charge !" label="je suis un label" info="Je suis une info" loading />
      <Input placeholder="Je suis une placeholder" label="je suis un label" iconLeft={<Lock />} />
      <Input placeholder="Je suis une placeholder" label="je suis un label" iconRight={<Lock />} />
      <Input small placeholder="Je suis une petit" label="je suis un label" iconRight={<Lock />} />
      <Input label="email" error="une erreur" value="J'ai écris n'imp !" info="je suis une info mais il ya une erreur" />
    </Stack>
  )
}
export function Minimal() {
  return (
    <Stack gap="$4">
      <Input minimal placeholder="Je suis une placeholder" label="je suis un label" info="Je suis une info" />
      <Input minimal placeholder="Je charge " label="je suis un label" info="Je suis une info" loading />
      <Input minimal placeholder="Je suis une placeholder" label="je suis un label" iconLeft={<Lock />} />
      <Input minimal placeholder="Je suis une placeholder" label="je suis un label" iconRight={<Lock />} />
      <Input minimal label="email" error="une erreur" value="J'ai écris n'imp !" info="je suis une info mais il ya une erreur" />
    </Stack>
  )
}
