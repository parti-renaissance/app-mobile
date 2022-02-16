import React, { FC } from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { TouchablePlatform } from './TouchablePlatform'

type Props = Readonly<{
  viewModel: SelectableIconLabelViewModel
  onSelected: (code: string) => void
}>

export interface SelectableIconLabelViewModel {
  code: string
  label: string
  image: ImageSourcePropType
  isSelected: boolean
}

const SelectableIconLabelView: FC<Props> = ({ viewModel, onSelected }) => {
  const containerStyle = viewModel.isSelected
    ? styles.containerSelected
    : styles.containerUnselected
  const labelStyle = viewModel.isSelected ? styles.labelSelected : undefined
  const imageStyle = viewModel.isSelected
    ? styles.imageSelected
    : styles.imageUnselected
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchablePlatform
        touchHighlight={Colors.touchHighlight}
        onPress={() => {
          onSelected(viewModel.code)
        }}
      >
        <View style={styles.innerContainer}>
          <Image style={imageStyle} source={viewModel.image} />
          <Text style={[styles.label, labelStyle]} numberOfLines={2}>
            {viewModel.label}
          </Text>
        </View>
      </TouchablePlatform>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 2,
    flex: 1,
    marginHorizontal: Spacing.small,
    marginVertical: Spacing.small,
  },
  containerSelected: {
    borderColor: Colors.primaryColor,
  },
  containerUnselected: {
    borderColor: Colors.defaultBackground,
  },
  imageSelected: {
    tintColor: Colors.primaryColor,
  },
  imageUnselected: {
    tintColor: Colors.lightText,
  },
  innerContainer: {
    alignItems: 'center',
    height: 94,
    justifyContent: 'center',
    padding: Spacing.small,
  },
  label: {
    ...Typography.body,
    marginTop: Spacing.unit,
    textAlign: 'center',
    color: Colors.darkText,
  },
  labelSelected: {
    color: Colors.primaryColor,
  },
})

export default SelectableIconLabelView
