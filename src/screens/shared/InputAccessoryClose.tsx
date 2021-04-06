import React, { FC } from 'react'
import { StyleSheet, Platform, InputAccessoryView, Button } from 'react-native'
import { BlurView } from '@react-native-community/blur'

import { Spacing } from '../../styles'

type Props = Readonly<{
  id: string
  title: string
  onPress: () => void
}>

const InputAccessoryClose: FC<Props> = ({ id, title, onPress }) => {
  return Platform.OS === 'ios' ? (
    <InputAccessoryView nativeID={id}>
      <BlurView style={styles.blur} blurType="prominent">
        <Button title={title} onPress={onPress} />
      </BlurView>
    </InputAccessoryView>
  ) : null
}

const styles = StyleSheet.create({
  blur: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.small,
  },
})

export default InputAccessoryClose
