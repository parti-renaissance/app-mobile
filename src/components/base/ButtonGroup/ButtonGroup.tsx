import { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react'
import { VoxButton as Button } from '@/components/Button'
import { styled } from '@tamagui/core'
import { ThemeableStack, ThemeName } from 'tamagui'

type ButtonGroupProps = {
  theme?: ThemeName
  options: {
    label: string
    value: string
  }[]
  value: string[]
  onChange: (value: string[]) => void
}

const ButtonGroupFrame = styled(ThemeableStack, {
  gap: '$3',
  flexDirection: 'row',
  flexWrap: 'wrap',
})

export default function ButtonGroup({ options, value, onChange, theme, ...props }: ButtonGroupProps & ComponentPropsWithoutRef<typeof ButtonGroupFrame>) {
  const handlePress = (item: string) => () => {
    if (value.includes(item)) {
      onChange(value.filter((v) => v !== item))
      return
    }
    onChange([item])
  }

  const isChecked = (item: string) => value.includes(item)
  return (
    <ButtonGroupFrame {...props}>
      {options.map((option) => (
        <Button size="sm" theme={theme} inverse={!isChecked(option.value)} onPress={handlePress(option.value)}>
          {option.label}
        </Button>
      ))}
    </ButtonGroupFrame>
  )
}
