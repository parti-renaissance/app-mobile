import React, { FC } from 'react'
import { Colors, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import DatePicker from 'react-native-datepicker'
import { StyleSheet } from 'react-native'

type Props = Readonly<{
  date: string | undefined
  onDateChange: (value: string) => void
}>

const BirthdayPicker: FC<Props> = (props) => {
  return (
    <DatePicker
      showIcon={false}
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
