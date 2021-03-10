import React, { forwardRef, RefObject } from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  label: string
  nextInput?: RefObject<TextInput>
  isLastInput?: boolean
}>

const UserInputView = forwardRef<TextInput, Props>((props, ref) => {
  const returnKeyType = props.isLastInput === true ? 'done' : 'next'
  const submitEditing = () => {
    if (props.nextInput !== undefined) {
      props.nextInput?.current?.focus()
    }
  }
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.label}>{props.label}</Text>
        <TextInput
          ref={ref}
          style={styles.textInput}
          placeholder={i18n.t('personalinformation.placeholder')}
          placeholderTextColor={Colors.lightText}
          returnKeyType={returnKeyType}
          onSubmitEditing={submitEditing}
        />
      </View>
      <View style={styles.separator} />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.unit,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    ...Typography.body,
    color: Colors.darkText,
  },
  textInput: {
    ...Typography.body,
    textAlign: 'right',
    flexGrow: 1,
    paddingVertical: 0,
    color: Colors.darkText,
  },
  separator: {
    height: Spacing.separatorHeight,
    marginTop: Spacing.unit,
    backgroundColor: Colors.separator,
  },
})

export default UserInputView
