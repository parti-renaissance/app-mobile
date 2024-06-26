import React, { FC, useState } from 'react'
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import { Colors, Typography } from '../../styles'
import { DateFormatter } from '../../utils/DateFormatter'
import i18n from '../../utils/i18n'

type Props = Readonly<{
  date: Date | undefined
  maximumDate?: Date
  placeholder: string
  onDateChange: (date: Date) => void
  style?: StyleProp<ViewStyle>
  textAlign?: TextStyle['textAlign']
}>

const BirthdayPicker: FC<Props> = (props) => {
  const [isDatePickerModalVisible, setIsDatePickerModalVisible] =
    useState(false)

  const isPlaceholder = props.date === undefined
  const formattedDate =
    props.date !== undefined
      ? DateFormatter.format(props.date, 'dd/MM/yyyy')
      : props.placeholder

  return (
    <View style={props.style}>
      <TouchableWithoutFeedback
        onPress={() => setIsDatePickerModalVisible(true)}
      >
        <Text
          suppressHighlighting={true}
          style={[
            styles.text,
            { textAlign: props.textAlign },
            isPlaceholder && styles.placeholder,
          ]}
        >
          {formattedDate}
        </Text>
      </TouchableWithoutFeedback>
      {/* <DateTimePickerModal
        isVisible={isDatePickerModalVisible}
        date={props.date}
        maximumDate={props.maximumDate}
        mode="date"
        display={Platform.select({
          // Pierre Felgines: Don't know why `'inline'` is not recognized without the cast
          ios: 'inline' as keyof IOSNativeProps['display'],
          android: 'default',
        })}
        confirmTextIOS={i18n.t('common.confirm')}
        cancelTextIOS={i18n.t('common.cancel')}
        onConfirm={(date) => {
          setIsDatePickerModalVisible(false)
          props.onDateChange(date)
        }}
        onCancel={() => setIsDatePickerModalVisible(false)}
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    ...Typography.body,
    color: Colors.darkText,
  },
  placeholder: {
    color: Colors.lightText,
  },
})

export default BirthdayPicker
