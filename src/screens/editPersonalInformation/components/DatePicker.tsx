import React, { forwardRef, useState } from 'react'
import { Keyboard } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import TextField from '@/components/TextField'
import { parseFrenchDate } from '@/utils/date'
import { Input, isWeb, View } from 'tamagui'

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

  const onHide = () => {
    Keyboard.dismiss()
    setIsDatePickerVisible(false)
  }

  const onShow = () => {
    if (!isWeb) {
      setIsDatePickerVisible(true)
    }
  }

  return (
    <View>
      <TextField
        ref={ref}
        label={label}
        value={inputValue}
        placeholder="JJ/MM/AAAA"
        showSoftInputOnFocus={false}
        onSubmitEditing={onHide}
        onChangeText={handleChange}
        onTouchStart={onShow}
        error={error}
      />
      <DateTimePickerModal
        locale="fr"
        date={value}
        confirmTextIOS="Valider"
        cancelTextIOS="Annuler"
        isVisible={isDatePickerVisible}
        accentColor="blue"
        mode="date"
        onConfirm={handleConfirm}
        onCancel={onHide}
      />
    </View>
  )
})

export default DatePickerField
