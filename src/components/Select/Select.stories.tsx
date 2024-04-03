import { Stack } from 'tamagui'
import Select from './Select'

export default {
  title: 'Select',
  component: Select,
}

export function Default() {
  return (
    <Stack gap="$4">
      <Select
        id={'sort-by-select'}
        label={'Sort by'}
        onValueChange={(property) => console.log('Sort by', property)}
        options={['name', 'percentDone', 'totalSize']}
        optionsTexts={['Name', 'Percent Done', 'Total Size']}
        placeholder={'Sort by'}
        value={'name'}
      />
    </Stack>
  )
}
