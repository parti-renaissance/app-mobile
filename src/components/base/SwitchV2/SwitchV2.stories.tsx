import { YStack } from 'tamagui'
import Switch from './SwitchV2'

export default {
  title: 'SwitchV2',
  component: Switch,
}

export const Default = () => (
  <YStack>
    <Switch />
    <Switch checked />
    <Switch disabled />
    <Switch checked disabled />
  </YStack>
)
