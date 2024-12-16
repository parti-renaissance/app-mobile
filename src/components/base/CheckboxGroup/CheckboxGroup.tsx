import Checkbox from '@/components/base/Checkbox/Checkbox'
import Text from '@/components/base/Text'
import { styled } from '@tamagui/core'
import { ThemeableStack, XStack } from 'tamagui'

type CheckboxGroupProps = {
  options: {
    label: string
    value: string
  }[]
  value: string[]
  onChange: (value: string[]) => void
}

const CheckboxGroupFrame = styled(ThemeableStack, {
  gap: '$medium',
  flexDirection: 'row',
  flexWrap: 'wrap',
})

const CheckboxGroupItem = ({ option, isChecked, handlePress }: { option: { label: string; value: string }; isChecked: boolean; handlePress: () => void }) => (
  <XStack
    flexGrow={1}
    flexShrink={1}
    flexBasis={'48%'}
    $md={{ flexBasis: '100%' }}
    gap="$small"
    group
    onPress={handlePress}
    alignItems="center"
    cursor="pointer"
  >
    <Checkbox checked={isChecked} onPress={handlePress} />
    <Text.MD multiline>{option.label}</Text.MD>
  </XStack>
)

export default function CheckboxGroup({ options, value, onChange }: CheckboxGroupProps) {
  const handlePress = (item: string) => () => {
    if (value.includes(item)) {
      onChange(value.filter((v) => v !== item))
      return
    }
    onChange([...value, item])
  }

  const isChecked = (item: string) => value.includes(item)
  return (
    <CheckboxGroupFrame>
      {options.map((option) => (
        <CheckboxGroupItem key={option.value} option={option} isChecked={isChecked(option.value)} handlePress={handlePress(option.value)} />
      ))}
    </CheckboxGroupFrame>
  )
}
