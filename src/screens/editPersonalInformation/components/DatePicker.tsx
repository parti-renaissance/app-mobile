import React, { forwardRef, useState } from 'react'
import { Keyboard } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import TextField from '@/components/TextField'
import { Input, View } from 'tamagui'

interface DatePickerFieldProps {
  onChange: (date: Date) => void
  onBlur?: () => void
  value ?: Date
  error?: boolean
  errorMessage?: string
}

const DatePickerField = forwardRef<Input, DatePickerFieldProps>((props, ref) => {
  const { onChange, error, errorMessage } = props

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [date, setDate] = useState('')

  const handleConfirm = (date) => {
    onChange(date)

    setDate(date.toLocaleDateString())
    setDatePickerVisibility(false)
  }

  return (
    <View>
      <TextField
        ref={ref}
        label="Date de naissance"
        value={date}
        placeholder="JJ/MM/AAAA"
        onFocus={() => setDatePickerVisibility(true)}
        showSoftInputOnFocus={false}
        onSubmitEditing={() => {
          Keyboard.dismiss()
          setDatePickerVisibility(false)
        }}
        error={error}
        errorMessage={errorMessage}
      />
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={() => setDatePickerVisibility(false)} />
    </View>
  )
})

export default DatePickerField
