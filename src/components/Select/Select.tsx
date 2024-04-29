import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { Adapt, Label, Select as SelectTamagui, Sheet, View, YStack } from 'tamagui'
import Text from '../base/Text'

interface SelectProps {
  id: string
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  label: string
  options: { value: string; text: string }[]
}

const Select = ({ id, value, onValueChange, placeholder, label, options }: SelectProps) => {
  const insets = useSafeAreaInsets()

  const selectedOption = options.find((option) => option.value === value)

  return (
    <View>
      {label && (
        <Label
          htmlFor={id}
          color="$gray5"
          fontWeight={'600'}
          fontFamily={'$PublicSans'}
          fontSize={'$1'}
          ml={'$1'}
          mb={'$-4'}
          pressStyle={{
            color: '$gray5',
          }}
        >
          {label}
        </Label>
      )}

      <SelectTamagui id={id} value={value} onValueChange={onValueChange}>
        <SelectTamagui.Trigger
          iconAfter={ChevronDown}
          backgroundColor={'$colorTransparent'}
          borderBottomWidth={1}
          borderBottomColor={'$gray3'}
          borderTopWidth={0}
          borderLeftWidth={0}
          borderRightWidth={0}
          borderRadius={0}
          padding={'$0'}
          outlineStyle="none"
          hoverStyle={{
            backgroundColor: '$colorTransparent',
          }}
          pressStyle={{
            backgroundColor: '$colorTransparent',
            borderBottomColor: '$gray8',
          }}
        >
          <SelectTamagui.Value placeholder={placeholder} color={'$gray6'} fontSize={'$2'} fontFamily={'$PublicSans'} fontWeight={'400'}>
            <Text color={'$gray6'}>{selectedOption?.text}</Text>
          </SelectTamagui.Value>
        </SelectTamagui.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet modal dismissOnSnapToBottom snapPointsMode="fit">
            <Sheet.Frame>
              <Adapt.Contents />
            </Sheet.Frame>
            <Sheet.Overlay />
          </Sheet>
        </Adapt>

        <SelectTamagui.Content zIndex={200}>
          <SelectTamagui.ScrollUpButton ai="center" jc="center" pos="relative" w="100%" h="$3">
            <YStack zi={10}>
              <ChevronUp size={20} />
            </YStack>
          </SelectTamagui.ScrollUpButton>

          <SelectTamagui.Viewport outlineStyle="none">
            <SelectTamagui.Group paddingBottom={insets.bottom}>
              <SelectTamagui.Label fontWeight={'$5'} fontSize={'$3'} backgroundColor={'none'}>
                <Text fontFamily={'$PublicSans'} fontSize={'$1'} fontWeight={'500'} color={'#00AEEF'}>
                  {label}
                </Text>
              </SelectTamagui.Label>

              {options.map((option, i) => {
                return (
                  <SelectTamagui.Item index={i} key={option.value} value={option.value} outlineStyle="none" bc="$backgroundStrong">
                    <SelectTamagui.ItemText>{option.text}</SelectTamagui.ItemText>
                    <SelectTamagui.ItemIndicator ml="auto">
                      <Check size={16} />
                    </SelectTamagui.ItemIndicator>
                  </SelectTamagui.Item>
                )
              })}
            </SelectTamagui.Group>
          </SelectTamagui.Viewport>

          <SelectTamagui.ScrollDownButton ai="center" jc="center" pos="relative" w="100%" h="$3">
            <YStack zi={10}>
              <ChevronDown size={20} />
            </YStack>
          </SelectTamagui.ScrollDownButton>
        </SelectTamagui.Content>
      </SelectTamagui>
    </View>
  )
}

export default React.memo(Select)
