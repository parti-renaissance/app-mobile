import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { TouchablePlatform } from '../shared/TouchablePlatform'

export interface ListPickerRowViewModel {
  id: string
  title: string
  isSelected: boolean
}

type Props = Readonly<{
  viewModel: ListPickerRowViewModel
  onPress?: () => void
}>

export const ListPickerRow: FunctionComponent<Props> = ({
  viewModel,
  onPress,
}) => {
  return (
    <View style={styles.root}>
      <TouchablePlatform
        onPress={onPress}
        touchHighlight={Colors.touchHighlight}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{viewModel.title}</Text>
          {viewModel.isSelected && (
            <Image
              style={styles.icon}
              source={require('../../assets/images/checkIcon.png')}
            />
          )}
        </View>
      </TouchablePlatform>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.defaultBackground,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.unit,
    minHeight: 44,
  },
  title: {
    ...Typography.body,
    color: Colors.darkText,
    flex: 1,
    textAlign: 'left',
  },
  icon: {
    tintColor: Colors.primaryColor,
  },
})
