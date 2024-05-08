import React, { forwardRef, useState } from 'react'
import { Keyboard } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import TextField from '@/components/TextField'
import { parseFrenchDate } from '@/utils/date'
import { Input, View } from 'tamagui'

interface DatePickerFieldProps {
  onChange: (date: Date | undefined) => void
  onBlur?: (fieldOrEvent: any) => void
  value?: Date
  error?: string
  errorMessage?: string
  label?: string
}

const DatePickerField = forwardRef<Input, DatePickerFieldProps>(({ value, onChange, error, label }, ref) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)

  const readableDate = value && value.toLocaleDateString ? value.toLocaleDateString() : ''
  const [inputValue, setInputValue] = useState(readableDate ?? '')

  const handleConfirm = (input: Date) => {
    onChange(input)
    setIsDatePickerVisible(false)
  }

  const handleChange = (input: string) => {
    setInputValue(input)
    if (input != '' && input.length === 10) {
      const candidate = parseFrenchDate(input)

      onChange?.(candidate)
    } else {
      onChange?.(undefined)
    }
  }

  return (
    <View>
      <TextField
        ref={ref}
        label={label}
        value={inputValue}
        placeholder="JJ/MM/AAAA"
        onFocus={() => setIsDatePickerVisible(true)}
        showSoftInputOnFocus={false}
        onSubmitEditing={() => {
          Keyboard.dismiss()
          setIsDatePickerVisible(false)
        }}
        onChangeText={handleChange}
        error={error}
      />
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={() => setIsDatePickerVisible(false)} />
    </View>
  )
})

export default DatePickerField
