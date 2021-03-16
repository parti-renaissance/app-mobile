import React, { FC } from 'react'
import { Colors, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import DatePicker, { DatePickerProps } from 'react-native-datepicker'
import { Platform, StyleSheet } from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'

type Props = Readonly<{
  date: Date | undefined
  onDateChange: (dateStr: string, date: Date) => void
}>

const BirthdayPicker: FC<Props> = (props) => {
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
      }}
      style={styles.picker}
      date={props.date}
      onDateChange={props.onDateChange}
    />
  )
}

const styles = StyleSheet.create({
  picker: { alignSelf: 'flex-end' },
})

export default BirthdayPicker
