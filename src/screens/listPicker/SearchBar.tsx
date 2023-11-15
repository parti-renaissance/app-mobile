import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, TextInput, View } from 'react-native'
import { useDebouncedCallback } from 'use-debounce'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { HorizontalSpacer } from '../shared/Spacer'

type Props = Readonly<{
  onChangeText: (text: string) => void
}>

export const SearchBar: FunctionComponent<Props> = ({ onChangeText }) => {
  const onChangeTextDebounced = useDebouncedCallback((input: string) => {
    onChangeText(input)
  }, 300)

  return (
    <View style={styles.container}>
      <Image
        style={styles.searchIcon}
        source={require('../../assets/images/searchIcon.png')}
      />
      <HorizontalSpacer spacing={Spacing.margin} />
      <TextInput
        style={styles.input}
        placeholder={i18n.t('common.search')}
        onChangeText={onChangeTextDebounced}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.margin,
    borderBottomColor: Colors.separator,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.margin,
    ...Typography.body,
  },
  searchIcon: {
    tintColor: Colors.darkText,
  },
})
