import React, { FC } from 'react'
import { Colors, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import DatePicker, { DatePickerProps } from 'react-native-datepicker'
import { Platform, StyleSheet } from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'

type Props = Readonly<{
  date: Date | undefined
  onDateChange: (formattedDate: string, date: Date) => void
  disabled?: boolean
}>

const BirthdayPicker: FC<Props> = (props) => {
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
        />
      )}
      format="DD/MM/YYYY"
      confirmBtnText={i18n.t('common.confirm')}
      cancelBtnText={i18n.t('common.cancel')}
      placeholder={i18n.t('personalinformation.placeholder')}
      customStyles={{
        // @ts-ignore: Placeholder attributes
        placeholderText: {
          ...Typography.body,
          color: Colors.lightText,
          textAlign: 'right',
        },
        dateInput: {
          borderWidth: 0,
          alignItems: 'flex-end',
          marginEnd: 4,
        },
        btnTextConfirm: { color: Colors.darkText },
        dateText: dateTextStyle,
        disabled: { backgroundColor: Colors.defaultBackground },
      }}
      style={styles.picker}
      date={props.date}
      onDateChange={props.onDateChange}
      disabled={props.disabled}
    />
  )
}

const styles = StyleSheet.create({
  picker: { alignSelf: 'flex-end' },
  textDisabled: {
    color: Colors.lightText,
  },
  textEnabled: { color: Colors.darkText },
})

export default BirthdayPicker
