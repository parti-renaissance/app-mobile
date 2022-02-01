import React, { FC } from 'react'
import { Colors, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import DatePicker, { DatePickerProps } from 'react-native-datepicker'
import {
  FlexAlignType,
  Platform,
  StyleProp,
  StyleSheet,
  useColorScheme,
  ViewStyle,
} from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'

type Props = Readonly<{
  date: Date | undefined
  maximumDate?: Date
  placeholder: string
  onDateChange: (formattedDate: string, date: Date) => void
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  inputAlign?: FlexAlignType
}>

const BirthdayPicker: FC<Props> = (props) => {
  const isDarkMode = useColorScheme() === 'dark'
  const dateTextStyle = props.disabled
    ? styles.textDisabled
    : styles.textEnabled
  return (
    <DatePicker
      showIcon={false}
      iOSDatePickerComponent={(iosProps: DatePickerProps) => (
        //@ts-ignore: unknown properties spread on RNDateTimePicker
        <RNDateTimePicker
          {...iosProps}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          style={isDarkMode ? styles.dark : styles.light}
        />
      )}
      format="DD/MM/YYYY"
      confirmBtnText={i18n.t('common.confirm')}
      cancelBtnText={i18n.t('common.cancel')}
      placeholder={props.placeholder}
      maxDate={props.maximumDate}
      customStyles={{
        // @ts-ignore: Placeholder attributes
        placeholderText: {
          ...Typography.body,
          color: Colors.lightText,
          textAlign: 'right',
        },
        dateInput: {
          borderWidth: 0,
          alignItems: props.inputAlign ? props.inputAlign : 'flex-end',
          marginEnd: 4,
        },
        btnTextConfirm: { color: Colors.primaryColor },
        dateText: dateTextStyle,
        disabled: { backgroundColor: Colors.defaultBackground },
        datePickerCon: isDarkMode ? styles.dark : styles.light,
      }}
      style={props.style ? props.style : styles.picker}
      date={props.date}
      onDateChange={props.onDateChange}
      disabled={props.disabled}
    />
  )
}

const styles = StyleSheet.create({
  dark: {
    backgroundColor: Colors.black,
  },
  light: {
    backgroundColor: Colors.white,
  },
  picker: { alignSelf: 'flex-end' },
  textDisabled: {
    color: Colors.lightText,
  },
  textEnabled: { color: Colors.darkText },
})

export default BirthdayPicker
