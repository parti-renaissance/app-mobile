import React, { forwardRef, RefObject } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import LabelInputContainer from './LabelInputContainer'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  label: string
  nextInput?: RefObject<TextInput>
  isLastInput?: boolean
}>

const LabelTextInput = forwardRef<TextInput, Props>((props, ref) => {
  const returnKeyType = props.isLastInput === true ? 'done' : 'next'
  const submitEditing = () => {
    if (props.nextInput !== undefined) {
      props.nextInput?.current?.focus()
    }
  }
  return (
    <LabelInputContainer label={props.label}>
      <TextInput
        ref={ref}
        style={styles.textInput}
        placeholder={i18n.t('personalinformation.placeholder')}
        placeholderTextColor={Colors.lightText}
        returnKeyType={returnKeyType}
        onSubmitEditing={submitEditing}
      />
    </LabelInputContainer>
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
    flexGrow: 1,
    textAlign: 'right',
    paddingVertical: 0,
    color: Colors.darkText,
  },
  separator: {
    height: Spacing.separatorHeight,
    marginTop: Spacing.unit,
    backgroundColor: Colors.separator,
  },
})

export default LabelTextInput
