import React, { FC } from 'react'
import { Colors, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import DatePicker from 'react-native-datepicker'

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
      style={{ alignSelf: 'flex-end' }}
      date={props.date}
      onDateChange={props.onDateChange}
    />
  )
}

export default BirthdayPicker
