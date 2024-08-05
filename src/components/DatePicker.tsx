import React, { forwardRef, useState } from 'react'
import { Keyboard } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { InputProps, default as TextField } from '@/components/base/Input/Input'
import { getFormattedDate, getHumanFormattedTime, getIntlDate } from '@/utils/date'
import { format, parseISO } from 'date-fns'
import { Input, isWeb, View } from 'tamagui'

interface DatePickerFieldProps {
  onChange?: (date: Date | undefined) => void
  onBlur?: (fieldOrEvent?: React.FocusEvent) => void
  value?: Date
  error?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  type?: 'date' | 'time'
  color: InputProps['color']
}

const getDateInputValue = (d: Date, type: 'date' | 'time') => (isWeb ? getIntlDate(d) : format(d, type === 'date' ? 'dd-MM-yyyy' : 'HH:mm'))

const DatePickerField = forwardRef<Input, DatePickerFieldProps>(({ value, onChange, error, label, disabled, color, type = 'date', onBlur }, ref) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)

  const readableDate = value && typeof value === 'object' ? getDateInputValue(value, type) : ''
  const [inputValue, setInputValue] = useState(readableDate ?? '')

  // In case of mobile component
  const handleConfirm = (input: Date) => {
    onChange?.(input)
    setInputValue(type === 'date' ? getFormattedDate(input) : getHumanFormattedTime(input))
    setIsDatePickerVisible(false)
    onBlur?.()
  }

  // In case of web component
  const handleChange = (input: string) => {
    setInputValue(input)

    if (input != '' && input.length === 10) {
      try {
        onChange?.(isWeb ? new Date(input) : parseISO(input))
      } catch (e) {
        //
      }
    } else if (type === 'time') {
      if (input.includes(':')) {
        const candidate = new Date()
        const inputParts = input.split(':')

        if (inputParts.length === 2) {
          candidate.setHours(Number(inputParts[0]))
          candidate.setMinutes(Number(inputParts[1]))
          onChange?.(candidate)
          return
        }
      }

      onChange?.(undefined)
    } else {
      onChange?.(undefined)
    }
  }

  const onHide = () => {
    if (!isWeb) {
      Keyboard.dismiss()
      setIsDatePickerVisible(false)
      onBlur?.()
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
        editable={isWeb && !disabled}
        onChangeText={handleChange}
        onPress={onShow}
        color={color}
        disabled={disabled}
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
        mode={type}
        onConfirm={handleConfirm}
        onCancel={onHide}
      />
    </View>
  )
})

export default DatePickerField
