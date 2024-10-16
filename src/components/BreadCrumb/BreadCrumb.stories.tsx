import { YStack } from 'tamagui'
import BreadCrumb from './BreadCrumb'

const items = [
  {
    id: 'coucou',
    label: 'coucou',
    onPress: () => console.log('coucou'),
  },
  {
    id: 'lol',
    label: 'lol',
    onPress: () => console.log('lol'),
  },
]

export default {
  title: 'Breadcrumb',
  component: BreadCrumb,
}

export function Default() {
  return (
    <YStack gap={16}>
      <BreadCrumb items={items} />
      <BreadCrumb items={items} vertical={true} />
    </YStack>
  )
}
