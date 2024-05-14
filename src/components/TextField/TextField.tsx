import React, { useEffect, useRef } from 'react'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import { AlertCircle } from '@tamagui/lucide-icons'
import { Input, isWeb, Label, styled, View, YStack } from 'tamagui'
import Text from '../base/Text'

export interface TextFieldProps extends React.ComponentProps<typeof Input> {
  label?: string
  value: string
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
  placeholder?: string
  error?: string
  isDate?: boolean
  fake?: boolean
}

const commonStyle = {
  width: '100%',
  padding: 0,
  borderRadius: 0,
  borderWidth: 0,
  borderBottomWidth: 1,
  borderBottomColor: '$gray3',
  backgroundColor: '$colorTransparent',
  color: '$gray6',
  outlineStyle: 'none',

  variants: {
    error: {
      true: {
        borderBottomWidth: 2,
        borderBottomColor: '$red6',
      },
    },

    disabled: {
      true: {
        opacity: 0.6,
        borderBottomColor: '$gray3',
      },
    },
  },
} as const

const TextFieldComponent = styled(Input, commonStyle)

const FakeTextFieldComponent = styled(YStack, commonStyle)

const TextField = ({ label, error, onChange, isDate = false, fake = false, ...inputProps }: TextFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current && isDate && isWeb) {
      inputRef.current.type = 'date'
    }
  }, [isDate])

  return (
    <View>
      {label && (
        <Label
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

      <View gap={6}>
        {fake ? (
          <FakeTextFieldComponent onPress={inputProps.onPress}>
            <Text color="$gray6" py="$3.5">
              {inputProps.value}
            </Text>
          </FakeTextFieldComponent>
        ) : (
          <TextFieldComponent
            // @ts-expect-error use browser's input in web environment
            ref={inputRef}
            focusStyle={{
              borderBottomColor: '$gray8',
            }}
            onChangeText={onChange as (x: any) => void}
            {...inputProps}
          />
        )}

        {!!error && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }} gap={4}>
            <AlertCircle size={16} color={'$red6'} />

            <Text color="$gray6" fontSize={'$1'}>
              {error}
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default React.memo(TextField)
