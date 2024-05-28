import React, { forwardRef, useState } from 'react'
import { Keyboard } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { default as TextField } from '@/components/base/Input/Input'
import { getFormattedDate, getIntlDate, parseFrenchDate } from '@/utils/date'
import { Input, isWeb, View } from 'tamagui'

interface DatePickerFieldProps {
  onChange: (date: Date | undefined) => void
  onBlur?: (fieldOrEvent: any) => void
  value?: Date
  error?: string
  errorMessage?: string
  label?: string
  type?: 'date' | 'time'
}

const getDateInputValue = (d: Date) => (isWeb ? getIntlDate(d) : d.toLocaleDateString())

const DatePickerField = forwardRef<Input, DatePickerFieldProps>(({ value, onChange, error, label, type = 'date' }, ref) => {
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

      onChange?.(candidate)
    } else {
      // onChange?.(undefined)
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
        fake={!isWeb}
        ref={ref}
        label={label}
        value={inputValue}
        placeholder={type === 'date' ? 'JJ/MM/AAAA' : 'HH:MM'}
        onSubmitEditing={onHide}
        editable={isWeb}
        onChangeText={handleChange}
        onChange={console.log}
        onPress={onShow}
        error={error}
        type={type}
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
