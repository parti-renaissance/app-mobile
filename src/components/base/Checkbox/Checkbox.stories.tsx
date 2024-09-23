import { YStack } from 'tamagui'
import Checkbox from './Checkbox'

export default {
  title: 'Checkbox',
  component: Checkbox,
}

export const Default = () => (
  <YStack>
    <Checkbox />
    <Checkbox checked />
    <Checkbox disabled />
    <Checkbox checked disabled />
  </YStack>
)
