import { YStack } from 'tamagui'
import Radio from './Radio'

export default {
  title: 'Radio',
  component: Radio,
}

export const Default = () => (
  <YStack>
    <Radio />
    <Radio checked />
    <Radio disabled />
    <Radio checked disabled />
  </YStack>
)
