import Radio from '@/components/base/Radio/Radio'
import Text from '@/components/base/Text'
import { styled } from '@tamagui/core'
import { ThemeableStack, XStack } from 'tamagui'

type RadioGroupProps = {
  options: {
    label: string
    value: string
  }[]
  value: string
  onChange: (value: string) => void
}

const RadioGroupFrame = styled(ThemeableStack, {
  gap: '$3',
})

export default function RadioGroup({ options, value, onChange }: RadioGroupProps) {
  const handlePress = (value: string) => () => {
    onChange(value)
  }
  return (
    <RadioGroupFrame>
      {options.map((option) => (
        <XStack key={option.value} gap="$2" group onPress={handlePress(option.value)} alignItems="center" cursor="pointer">
          <Radio checked={value === option.value} />
          <Text.MD multiline>{option.label}</Text.MD>
        </XStack>
      ))}
    </RadioGroupFrame>
  )
}
