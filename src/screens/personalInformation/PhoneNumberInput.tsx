import React, { forwardRef } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import LabelInputContainer from './LabelInputContainer'

type Props = Readonly<{
  labelStyle?: StyleProp<ViewStyle>
  label: string
  placeholder: string
  nextInput?: React.RefObject<TextInput>
  isLastInput?: boolean
  phoneNumber: string
  callingCode: string
  errorMessage?: string
  multiLine?: boolean
  inputAccessoryViewID?: string
  onCallingCodePress?: () => void
  onPhoneNumberChange: (value: string) => void
}>

const PhoneNumberInput = forwardRef<TextInput, Props>((props, ref) => {
  const returnKeyType = props.isLastInput === true ? 'done' : 'next'
  const submitEditing = () => {
    if (props.nextInput !== undefined) {
      props.nextInput?.current?.focus()
    }
  }

  const textInputStyle = props.multiLine ? styles.expanded : styles.collapsed

  return (
    <LabelInputContainer
      labelStyle={props.labelStyle}
      label={props.label}
      errorMessage={props.errorMessage}
      multiLine={props.multiLine}
    >
      <View style={styles.container}>
        <TouchablePlatform
          style={styles.callingCodeContainer}
          touchHighlight={Colors.touchHighlight}
          onPress={props.onCallingCodePress}
        >
          <Text style={styles.callingCode}>{props.callingCode}</Text>
        </TouchablePlatform>
        <TextInput
          ref={ref}
          style={[styles.textInput, textInputStyle]}
          placeholder={props.placeholder}
          placeholderTextColor={Colors.lightText}
          returnKeyType={returnKeyType}
          onSubmitEditing={submitEditing}
          defaultValue={props.phoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => {
            props.onPhoneNumberChange(value)
          }}
          inputAccessoryViewID={props.inputAccessoryViewID}
        />
      </View>
    </LabelInputContainer>
  )
})

const styles = StyleSheet.create({
  collapsed: {
    minWidth: 115,
    textAlign: 'right',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  callingCodeContainer: {
    backgroundColor: Colors.lightBackground,
    paddingHorizontal: Spacing.small,
  },
  callingCode: {
    ...Typography.body,
    color: Colors.darkText,
  },
  expanded: {
    flexGrow: 1,
    marginStart: Spacing.margin,
    textAlign: 'left',
  },
  textInput: {
    ...Typography.body,
    lineHeight: undefined,
    color: Colors.darkText,
    paddingVertical: 0,
  },
})

export default PhoneNumberInput
