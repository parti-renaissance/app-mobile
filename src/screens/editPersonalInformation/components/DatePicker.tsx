import React, { forwardRef, useState } from 'react'
import { Keyboard } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import TextField from '@/components/TextField'
import { getFormattedDate, getIntlDate, parseFrenchDate } from '@/utils/date'
import { Input, isWeb, View } from 'tamagui'

interface DatePickerFieldProps {
  onChange: (date: Date | undefined) => void
  onBlur?: (fieldOrEvent: any) => void
  value?: Date
  error?: string
  errorMessage?: string
  label?: string
}

const getDateInputValue = (d: Date) => (isWeb ? getIntlDate(d) : d.toLocaleDateString())

const DatePickerField = forwardRef<Input, DatePickerFieldProps>(({ value, onChange, error, label }, ref) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)

  const readableDate = value && typeof value === 'object' ? getDateInputValue(value) : ''
  const [inputValue, setInputValue] = useState(readableDate ?? '')

  const handleConfirm = (input: Date) => {
    onChange?.(input)
    setInputValue(getFormattedDate(input))
    setIsDatePickerVisible(false)
  }

  const handleChange = (input: string) => {
    setInputValue(input)

    if (input != '' && input.length === 10) {
      const candidate = isWeb ? new Date(input) : parseFrenchDate(input)
      console.log(candidate)

      onChange?.(candidate)
    } else {
      onChange?.(undefined)
    }
  }

  const onHide = () => {
    if (!isWeb) {
      Keyboard.dismiss()
      setIsDatePickerVisible(false)
    }
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
        isDate
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
